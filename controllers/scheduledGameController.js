const { ScheduledGame, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllScheduledGames = async (req, res) => {
    try {
        const result = await ScheduledGame.findAll();
        return res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

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

const deleteScheduledGame = async (req, res) => {
    try {
        const result = await ScheduledGame.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        await result.destroy();
        res.status(200).json({ message: 'Jeu supprimé', data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

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

module.exports = { findAllScheduledGames, findScheduledGameById, createScheduledGame, updateScheduledGame, deleteScheduledGame, joinScheduledGame };