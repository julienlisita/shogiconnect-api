const { User } = require("../db/sequelizeSetup");
const bcrypt = require('bcrypt');
const { errorHandler } = require("../errorHandler/errorHandler");
const fs = require('fs');

// Fonction pour récupérer la liste de tous les utilisateurs
const findAllUsers = async (req, res) => {
    try {
        const result = await User.findAll()
        return res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

// Fonction pour trouver un utilisateur par son id
const findUserByPk = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id)
        if (!result) {
            return res.json({ message: 'Utilisateur non trouvé' })
        }
        res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

// Fonction pour créer un nouvel utilisateur
const createUser = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 5)
        req.body.password = hashPassword

        if (req.body.RoleId) {
            return res.status(403).json({ message: 'Droit non modifiable' })
        }

        const result = await User.create(req.body)

        res.json({ message: `Utilisateur créé`, data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

// Fonction pour mettre à jour un utilisateur
const updateUser = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }
        if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 8)
            req.body.password = hash
        }

        if (req.body.RoleId) {
            if (result.RoleId < req.user.RoleId || req.body.RoleId < req.user.RoleId) return res.status(403).json({ message: "Droits insuffisants pour mise à jour" })
        }

        await result.update(req.body)

        res.status(201).json({ message: 'Utilisateur modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const currentUserId = req.user.id; 

        if (userId === currentUserId) {
            return res.status(403).json({ message: 'Vous ne pouvez pas vous supprimer vous-même.' });
        }

        const result = await User.findByPk(userId);
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }

        await result.destroy()
        res.status(200).json({ message: 'Utilisateur supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

// fonction pour accèder à ses données de profil
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Profil utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Profil récupéré avec succès', data: user });
    } catch (error) {
        errorHandler(error, res);
    }
}

// fonction mettre à jour son propore profil
const updateProfile = async (req, res) => {
    try {
        const result = await User.findByPk(req.user.id);
        if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 8)
            req.body.password = hash
        }

        if (req.body.RoleId) {
            return res.status(403).json({ message: 'Droit non modifiable' })
        }

        await result.update(req.body)

        res.status(201).json({ message: 'Utilisateur modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

// Fonction pour supprimer son propre profil
const deleteProfile = async (req, res) => {
    try {
        const result = await User.findByPk(req.user.id);
        await result.destroy()
        res.status(200).json({ message: 'Profil utilisateur supprimé avec succès', data: result });
    } catch (error) {
        errorHandler(error, res)
    }
}

// Fonction pour gérer l'upload de l'avatar
const updateAvatar = async (req, res) => {
    try {
        // Vérification du fichier envoyé
        const avatarFile = req.file;
        if (!avatarFile) {
            return res.status(400).json({ message: 'Aucun fichier image envoyé.' });
        }

        // Chemin du fichier avatar
        const avatarPath = avatarFile.filename;

        // Récupération de l'utilisateur actuellement connecté (basé sur son ID)
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Mise à jour de l'avatar dans la base de données
        user.avatar = avatarPath;
        await user.save();

        // Réponse de succès
        return res.status(200).json({ message: 'Avatar mis à jour avec succès.', avatar: avatarPath });
    } catch (error) {
        // Gestion des erreurs spécifiques à Multer (par exemple fichier trop volumineux)
        if (error instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Erreur d\'upload : ' + error.message });
        }

        // Gestion des autres erreurs
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'avatar.', error });
    }
};

// Fonction pour changer le role de l'utilisateur
const updateUserRole = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` });
        }

        // Mise à jour du rôle
        result.RoleId = req.body.RoleId;
        await result.save();

        res.status(200).json({ message: "Rôle mis à jour avec succès", data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = { findAllUsers, findUserByPk, createUser, updateUser, deleteUser, getProfile, updateProfile, deleteProfile, updateAvatar, updateUserRole};