const { User } = require("../db/sequelizeSetup");
const bcrypt = require('bcrypt');
const { errorHandler } = require("../errorHandler/errorHandler");
const { AdminActivity } = require("../db/sequelizeSetup");
const { updateAdminStats } = require('../services/adminStatsService'); 
const { updateSiteStats } = require("../services/siteStatsService");
const streamifier = require('streamifier');
const cloudinary = require('../utils/cloudinary');
const deleteFromCloudinary = require('../utils/deleteFromCloudinary');
const multer = require('multer');
const ROLE_ADMIN = 2;

// Fonction pour récupérer la liste de tous les utilisateurs
const findAllUsers = async (req, res) => {
    try {
        const result = await User.findAll()
        return res.json({ data: result })
    } catch (error) {
        return errorHandler(error, res)
    }
}

// Fonction pour trouver un utilisateur par son id
const findUserByPk = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id)
        if (!result) {
            return res.json({ message: 'Utilisateur non trouvé' })
        }
        return res.json({ data: result })
    } catch (error) {
        return errorHandler(error, res)
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

        // Mettre à jour les statistique du site    
        await updateSiteStats('CREATE_USER');

        return res.json({ message: `Utilisateur créé`, data: result })

    } catch (error) {
        return errorHandler(error, res)
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

        return res.status(201).json({ message: 'Utilisateur modifié', data: result })
    } catch (error) {
        return errorHandler(error, res)
    }
}

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const currentUserId = req.user.id; 
        const userRole = req.user.RoleId;

        if (userId === currentUserId) {
            return res.status(403).json({ message: 'Vous ne pouvez pas vous supprimer vous-même.' });
        }

        const result = await User.findByPk(userId);
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }

        await result.destroy()

        // Si l'utilisateur est un administrateur, enregistrer l'activité
        if (userRole === ROLE_ADMIN) {
            // Enregistrer l'activité de l'admin 
            await AdminActivity.create({
                activity_type: 'DELETE_USER',  // Type d'activité
                admin_id: req.user.id,  // ID de l'admin
                related_id: userId,  // ID de l'utilisateur supprimé
                related_name: result.username, // Nom de l'utilisateur supprimé (par exemple)
                related_type: 'User'  // Type de l'entité liée (ici, un utilisateur)
            });
            // Mettre à jour les statistiques de l'admin
            await updateAdminStats(req.user.id, 'DELETE_USER');
            // Mettre à jour les statistique du site    
            await updateSiteStats('DELETE_USER');
        }
        
        return res.status(200).json({ message: 'Utilisateur supprimé', data: result })
    } catch (error) {
        return errorHandler(error, res)
    }
}

// fonction pour accèder à ses données de profil
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Profil utilisateur non trouvé' });
        }
        return res.status(200).json({ message: 'Profil récupéré avec succès', data: user });
    } catch (error) {
        return errorHandler(error, res);
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

        return res.status(201).json({ message: 'Utilisateur modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

// Fonction pour supprimer son propre profil
const deleteProfile = async (req, res) => {
    try {
        const result = await User.findByPk(req.user.id);
        await result.destroy()
        return res.status(200).json({ message: 'Profil utilisateur supprimé avec succès', data: result });
    } catch (error) {
        return errorHandler(error, res)
    }
}

// Contrôleur pour mettre à jour l'avatar d'un utilisateur
const updateAvatar = async (req, res) => {
    console.log('Avatar request received');
    console.log('Avatar request received from:', req.get("origin"));
    console.log('Headers:', req.headers);

    try {
        // 1. Vérification de l'utilisateur
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Utilisateur non authentifié.' });
        }
        const userId = req.user.id;
        console.log('User authentifié :', req.user);

        // 2. Vérifier qu’un fichier a bien été envoyé
        const avatarFile = req.file;
        if (!avatarFile) {
            return res.status(400).json({ message: 'Aucun fichier image envoyé.' });
        }
        console.log('Fichier reçu :', avatarFile.originalname, avatarFile.size, avatarFile.mimetype);

        // 3. Savoir si on utilise Cloudinary
        const useCloudinary = process.env.USE_CLOUDINARY === 'true';
        console.log('Utilisation de Cloudinary :', useCloudinary);

        // 4. Vérifier que la config Cloudinary est bien présente
        if (
            useCloudinary &&
            (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)
        ) {
            return res.status(500).json({ message: 'Configuration Cloudinary manquante.' });
        }

        let newAvatarPath;

        // 5. Upload vers Cloudinary
        if (useCloudinary) {
            const streamUpload = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'avatars',
                            public_id: `avatar_${Date.now()}`,
                            format: 'png',
                        },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );

                    streamifier.createReadStream(avatarFile.buffer).pipe(stream);
                });
            };

            try {
                const result = await streamUpload();
                newAvatarPath = result.secure_url;
                console.log('Upload Cloudinary réussi :', newAvatarPath);
            } catch (cloudErr) {
                console.error('Échec de l\'upload Cloudinary :', cloudErr);
                return res.status(500).json({ message: 'Échec de l\'upload Cloudinary', error: cloudErr.message || cloudErr });
            }
        } else {
            newAvatarPath = avatarFile.filename;
            console.log('Avatar stocké localement :', newAvatarPath);
        }

        // 6. Récupération et mise à jour de l'utilisateur
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // 7. Suppression de l'ancien avatar si nécessaire
        if (useCloudinary && user.avatar && user.avatar.startsWith('http')) {
            await deleteFromCloudinary(user.avatar);
            console.log('Ancien avatar supprimé de Cloudinary');
        }

        user.avatar = newAvatarPath;
        await user.save();

        // 8. Succès
        return res.status(200).json({
            message: 'Avatar mis à jour avec succès.',
            avatar: newAvatarPath,
        });

    } catch (error) {
        // 9. Gestion des erreurs Multer
        if (error instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Erreur d\'upload : ' + error.message });
        }

        // 10. Autres erreurs
        console.error('Erreur updateAvatar:', error);
        return res.status(500).json({
            message: 'Erreur lors de la mise à jour de l\'avatar.',
            error: error.message || error.toString(),
        });
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

        return res.status(200).json({ message: "Rôle mis à jour avec succès", data: result });
    } catch (error) {
        return errorHandler(error, res);
    }
};

module.exports = { findAllUsers, findUserByPk, createUser, updateUser, deleteUser, getProfile, updateProfile, deleteProfile, updateAvatar, updateUserRole};