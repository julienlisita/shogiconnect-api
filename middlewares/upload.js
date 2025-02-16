// middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Définir le stockage et la destination des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads'); // Le répertoire où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);  // Extrait l'extension du fichier
        const fileName = `avatar_${Date.now()}${fileExtension}`;  // Crée un nom unique pour le fichier
        cb(null, fileName);  // Attribue le nom au fichier
    }
});

// Accepter uniquement certains types de fichiers (par exemple .jpg, .png)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non autorisé'), false);
    }
};

// Configuration de multer avec stockage et filtre de fichier
const upload = multer({ storage, fileFilter });

module.exports = upload;