// authController.js

const { User } = require("../db/sequelizeSetup")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../configs/privatekey");
const { generateToken } = require('../utils/auth.js');

const login = async (req, res, next) => {
    try {
        // Validation des entrées
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.scope('withPassword').findOne({ where: { username: req.body.username } });
        if (user === null) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Génération du token JWT
        const token = generateToken(user);
        res.status(200).json({ message: 'Connexion réussie', token });
        
    } catch (error) {
        next(error); 
    }
};
    
const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.access_token 

        if (!token) {
            return res.status(200).json({ isLoggedIn: false });
        }
        
        const decoded = jwt.verify(token, SECRET_KEY); 
        const userId = decoded.userId; 

        const user = await User.findByPk(userId);
        if (!user) {
            console.log("pas d'utilisateur")
            return res.status(200).json({ isLoggedIn: false });
        }

        res.status(200).json({ message: "authentification réussie" ,isLoggedIn: true })
    
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        console.log("autre erreur")
        res.status(200).json({ isLoggedIn: false });
    }
};

const logout = (req, res) => {
     // supprimer le token du storage dans le front:
    // - localStorage pour React Web
    // - AsyncStorage pour React Native

    // Réponse de succès pour la déconnexion
    res.status(200).json({ message: 'Déconnexion réussie' });
}

const signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }
  
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Création de l'utilisateur
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const token = generateToken(newUser);
      res.status(201).json({ message: 'Utilisateur créé avec succès.', token, newUser });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
  };

module.exports = { login, logout, checkAuth, signup }
