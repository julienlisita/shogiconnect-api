const { User } = require("../db/sequelizeSetup")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../configs/privatekey");
const { errorHandler } = require("../errorHandler/errorHandler");

const login = async (req, res) => {
    try {
        // Validation des entrées
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const result = await User.scope('withPassword').findOne({ where: { username: req.body.username } });
        if (result === null) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }

        const isCorrect = await bcrypt.compare(req.body.password, result.password);
        if (!isCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Génération du token JWT
        const token = jwt.sign({ userId: result.id }, SECRET_KEY, { expiresIn: '24h' });

        // Ajout du token dans un cookie sécurisé
        res.cookie("access_token", token, {
            httpOnly: true, // Le cookie n'est pas accessible depuis le JS client
            secure: process.env.NODE_ENV === 'production', // Utilisé uniquement en production avec HTTPS
            sameSite: 'strict' // Empêche l'envoi dans des requêtes cross-site
        }).json({ message: "Login réussi" });
        
    } catch (error) {
        errorHandler(error, res); // Gestion des erreurs
    }
};

const logout = (req, res) => {
    res.clearCookie('access_token').json({ message: "log out" })
}

module.exports = { login, logout }