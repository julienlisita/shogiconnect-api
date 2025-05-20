const { UserStat, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllUserStats = async (req, res) => {
    try {
        const result = await UserStat.findAll();
        return res.json({ data: result });
    } catch (error) {
        return errorHandler(error, res);
    }
};

const findUserStatById = async (req, res) => {
    try {
        const result = await UserStat.findByPk(req.params.id, { include: User });
        if (!result) {
            return res.status(404).json({ message: 'UserStat non trouvé' });
        }
        return res.json({ data: result });
    } catch (error) {
        return errorHandler(error, res);
    }
};

const createUserStat = async (req, res) => {
    try {
        const { wins, losses, draws, score, userId } = req.body;
        const user = await User.findByPk(userId);
        if (user) {
            const result = await UserStat.create({ wins, losses, draws, score, UserId: userId });
            return res.status(201).json({ message: `UserStat créé`, data: result });
        } else {
            return res.status(400).json({ error: 'Utilisateur invalide' });
        }
    } catch (error) {
        return errorHandler(error, res);
    }
};

const updateUserStat = async (req, res) => {
    try {
        const result = await UserStat.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'UserStat non trouvé' });
        }

        await result.update(req.body);
        return res.status(200).json({ message: 'UserStat modifié', data: result });
    } catch (error) {
        return errorHandler(error, res);
    }
};

const deleteUserStat = async (req, res) => {
    try {
        const result = await UserStat.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'UserStat non trouvé' });
        }
        await result.destroy();
        return res.status(200).json({ message: 'UserStat supprimé', data: result });
    } catch (error) {
        return errorHandler(error, res);
    }
};

module.exports = { findAllUserStats, findUserStatById, createUserStat, updateUserStat, deleteUserStat };