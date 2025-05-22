// middlewares/upload.js

const multer = require('multer');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

const USE_CLOUDINARY = process.env.USE_CLOUDINARY === 'true';

let storage;

if (USE_CLOUDINARY) {
    // Utiliser la mémoire pour envoyer les fichiers manuellement via upload_stream
    storage = multer.memoryStorage();
} else {
    // Stockage local sur le disque
    storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `avatar_${Date.now()}${ext}`);
        },
    });
}

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Type de fichier non autorisé'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;