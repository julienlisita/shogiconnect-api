const { UserActivity, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllActivities = async (req, res) => {
    try {
        const result = await UserActivity.findAll();
        return res.json({message: "Activités trouvées", data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const findActivityById = async (req, res) => {
    try {
        const result = await UserActivity.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Activité non trouvée" });
        }
        res.json({ message: "Activités trouvées", data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const findActivityByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const activities = await UserActivity.findAll({
            where: { UserId: userId },
        });

        if (!activities.length) {
            return res.status(404).json({ message: "Aucune activité trouvée pour cet utilisateur." });
        }

        res.json({ message: "Activités trouvées", data: activities });
    } catch (error) {
        errorHandler(error, res);
    }
};

const createActivity = async (req, res) => {
    try {
        const { userId, type, relatedType, relatedId } = req.body;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(400).json({ error: "Utilisateur invalide" });
        }

        const result = await UserActivity.create({
            userId,
            type,
            relatedType,
            relatedId
        });

        res.status(201).json({ message: "Activité créée", data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const deleteActivity = async (req, res) => {
    try {
        const result = await UserActivity.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Activité non trouvée" });
        }
        await result.destroy();
        res.status(200).json({ message: "Activité supprimée", data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = { findAllActivities, findActivityById, findActivityByUserId, createActivity, deleteActivity };