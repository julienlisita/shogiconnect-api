const { Game, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllGames = async (req, res) => {
    try {
        const result = await Game.findAll();
        return res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const findGameById = async (req, res) => {
    try {
        const result = await Game.findByPk(req.params.id, { include: User });
        if (!result) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const createGame = async (req, res) => {
    try {
        const { status = "disponible", level, rendezVousAt } = req.body;

        const result = await Game.create({ 
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

const updateGame = async (req, res) => {
    try {
        const result = await Game.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }

        await result.update(req.body);
        res.status(200).json({ message: 'Jeu modifié', data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const deleteGame = async (req, res) => {
    try {
        const result = await Game.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        await result.destroy();
        res.status(200).json({ message: 'Jeu supprimé', data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = { findAllGames, findGameById, createGame, updateGame, deleteGame };