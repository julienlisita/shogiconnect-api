const { ScheduledGame, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");
const ROLE_ADMIN = 2

// Récupérer la liste des parties créées
const findAllScheduledGames = async (req, res) => {
    try {
        const result = await ScheduledGame.findAll();
        return res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Récupérer une partie par id
const findScheduledGameById = async (req, res) => {
    try {
        const result = await ScheduledGame.findByPk(req.params.id, { include: User });
        if (!result) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Créer une partie en tant qu'organisateur
const createScheduledGame = async (req, res) => {
    try {
        const { status = "disponible", level, rendezVousAt } = req.body;

        const result = await ScheduledGame.create({ 
            OrganizerId: req.user.id, // Utiliser l'ID de l'utilisateur authentifié
            ParticipantId: null, 
            status, 
            level, 
            rendezVousAt 
        });

        res.status(201).json({ message: 'Jeu créé', data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Modifier une partie en tant qu'organisateur
const updateScheduledGame = async (req, res) => {
    try {
        const result = await ScheduledGame.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }

        await result.update(req.body);
        res.status(200).json({ message: 'Jeu modifié', data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Supprimer une partie en tant qu'organisateur
const deleteScheduledGame = async (req, res) => {
    try {
        const scheduledGame = await ScheduledGame.findByPk(req.params.id);

        if (!scheduledGame) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }
        
        if (scheduledGame.OrganizerId !== req.user.id && req.user.RoleId !== ROLE_ADMIN) {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer cette partie." });
        }

        await scheduledGame.destroy();
        res.status(200).json({ message: 'Partie supprimée avec succès' });
    } catch (error) {
        errorHandler(error, res);
    }
};

 // S'inscrire à une partie en tant que participant
const joinScheduledGame = async (req, res) => {
    try {
        const scheduledGame = await ScheduledGame.findByPk(req.params.id);
        if (!scheduledGame) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }

        if (scheduledGame.ParticipantId) {
            return res.status(400).json({ message: 'Cette partie a déjà un participant' });
        }

        scheduledGame.ParticipantId = req.user.id;
        scheduledGame.status = "reservée";
        await scheduledGame.save();

        res.status(200).json({ message: 'Inscription réussie', data: scheduledGame });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Se désinscrire d'une partie en tant que participant
const unsubscribeFromScheduledGame = async (req, res) => {
    try {
        const scheduledGame = await ScheduledGame.findByPk(req.params.id);

        if (!scheduledGame) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }

        // Vérification : seul le participant lui même ou un admin pour le désinscrire
        if (scheduledGame.ParticipantId !== req.user.id && req.user.RoleId !== ROLE_ADMIN) {
            return res.status(403).json({ message: "Vous n'avez pas de droit de désincrire ce participant" });
        }

        scheduledGame.ParticipantId = null;
        scheduledGame.status = "disponible";
        await scheduledGame.save();

        res.status(200).json({ message: 'Désinscription réussie', data: scheduledGame });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = { findAllScheduledGames, findScheduledGameById, createScheduledGame, updateScheduledGame, deleteScheduledGame, joinScheduledGame, unsubscribeFromScheduledGame };