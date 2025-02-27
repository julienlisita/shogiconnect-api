const { AdminStat, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllAdminStats = async (req, res) => {
    try {
        const result = await AdminStat.findAll();
        return res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const findAdminStatById = async (req, res) => {
    try {
        const result = await AdminStat.findByPk(req.params.id, { include: User });
        if (!result) {
            return res.status(404).json({ message: 'UserStat non trouvé' });
        }
        res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const createAdminStat = async (req, res) => {
    try {
        const { usersDeleted, topicsDeleted, commentsDeleted, scheduledGamesDeleted, adminId } = req.body;
        const user = await User.findByPk(adminId);
        if (user) {
            const result = await AdminStat.create({
                usersDeleted,
                topicsDeleted,
                commentsDeleted,
                scheduledGamesDeleted,
                adminId,
              });
            res.status(201).json({ message: `AdminStat créé`, data: result });
        } else {
            return res.status(400).json({ error: 'Admin invalide' });
        }
    } catch (error) {
        errorHandler(error, res);
    }
};

const updateAdminStat = async (req, res) => {
    try {
        const result = await AdminStat.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'AdminStat non trouvé' });
        }

        await result.update(req.body);
        res.status(200).json({ message: 'AdminStat modifié', data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const deleteAdminStat = async (req, res) => {
    try {
        const result = await AdminStat.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'AdminStat non trouvé' });
        }
        await result.destroy();
        res.status(200).json({ message: 'AdminStat supprimé', data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = { findAllAdminStats, findAdminStatById, createAdminStat, updateAdminStat, deleteAdminStat };