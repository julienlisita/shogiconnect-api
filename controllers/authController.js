const { User } = require("../db/sequelizeSetup")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../configs/privatekey");
const { errorHandler } = require("../errorHandler/errorHandler");

const login = async (req, res) => {
    try {
        const result = await User.scope('withPassword').findOne({ where: { username: req.body.username } })
        if (result === null) {
            return res.status(404).json({ message: `Invalid Credentials` })
        }
        const isCorrect = await bcrypt.compare(req.body.password, result.password)

        if (!isCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ userId: result.id }, SECRET_KEY, { expiresIn: '24h' });
        res.cookie("access_token", token).json({ message: "Login réussi" })
    } catch (error) {
        errorHandler(error, res)
    }
}

const logout = (req, res) => {
    res.clearCookie('access_token').json({ message: "log out" })
}

module.exports = { login, logout }