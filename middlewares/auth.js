const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/privatekey');
const { User, Role } = require('../db/sequelizeSetup');
const { errorHandler } = require('../errorHandler/errorHandler');

const rolesHierarchy = {
    user: ['user'],
    admin: ['admin', 'user'],
    superadmin: ['superadmin', 'admin', 'user']
}

const protect = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Non authentifié" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Non authentifié" })
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const result = await User.findByPk(decoded.userId, { include: Role })
        if (!result) {
            return res.status(404).json({ message: `Vous n'êtes pas authentifié` })
        }

        req.user = result
        next()
    } catch (error) {
        return res.status(401).json({ message: "Jeton non valide" })
    }
}

const restrictTo = (labelRole) => {
    return async (req, res, next) => {
        try {
            if (!rolesHierarchy[req.user.Role.label].includes(labelRole)) {
                return res.status(403).json({ message: "Droits insuffisants" })
            }

            next()
        } catch (error) {
            errorHandler(error, res)
        }
    }
}

const restrictToOwnUser = (model) => {
    return async (req, res, next) => {
        try {
            const result = await model.findByPk(req.params.id)
            if (!result) return res.status(404).json({ message: 'ressource non trouvée' })
            
            if (rolesHierarchy[req.user.Role.label].includes("admin")) {
                return next()
            }
            
            if (result.UserId !== req.user.id) {
                return res.status(403).json({ message: 'Non autorisé' })
            }

            next()
        } catch (error) {
            errorHandler(error, res)
        }
    }
}

module.exports = { protect, restrictToOwnUser, restrictTo }