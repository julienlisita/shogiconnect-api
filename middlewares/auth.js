const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/privatekey');
const { User } = require('../db/sequelizeSetup');
const { errorHandler } = require('../errorHandler/errorHandler');

const protect = async (req, res, next) => {
    
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ message: "Non authentifié" })
    }

    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const result = await User.findByPk(decoded.userId)
        if (!result) {
            return res.status(404).json({ message: `Vous n'êtes pas authentifié` })
        }

        req.user = result
        next()
    } catch (error) {
        return res.status(401).json({ message: "Jeton non valide" })
    }
}


const restrictToOwnUser = (model) => {
    return async (req, res, next) => {
        try {
            const result = await model.findByPk(req.params.id)
            if (!result) return res.status(404).json({ message: 'ressource non trouvée' })

            if (result.UserId !== req.user.id) {
                return res.status(403).json({ message: 'Non autorisé' })
            }

            next()
        } catch (error) {
            errorHandler(error, res)
        }
    }
}

module.exports = { protect, restrictToOwnUser }