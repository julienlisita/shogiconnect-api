// utils/deleteFromCloudinary.js

const cloudinary = require('./cloudinary');

// Supprimer une image Cloudinary à partir de son URL complète
const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl || !imageUrl.startsWith('http')) return;

    try {
        const parts = imageUrl.split('/');
        const publicIdWithExtension = parts[parts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];

        // Exemple : dossier/avatar_12345678
        const folder = parts[parts.length - 2];
        const cloudinaryPublicId = `${folder}/${publicId}`;

        await cloudinary.uploader.destroy(cloudinaryPublicId);
    } catch (error) {
        console.error('Erreur lors de la suppression Cloudinary :', error);
    }
};

module.exports = deleteFromCloudinary;