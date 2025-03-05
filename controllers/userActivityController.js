const { UserActivity } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllUserActivities = async (req, res) => {
    try {
        const result = await UserActivity.findAll();
        return res.json({message: "Activités trouvées", data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

const findUserActivityById = async (req, res) => {
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

const findUserActivityByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const activities = await UserActivity.findAll({
            where: { user_id: userId },
        });

        if (!activities.length) {
            return res.status(404).json({ message: "Aucune activité trouvée pour cet utilisateur." });
        }

        res.json({ message: "Activités trouvées", data: activities });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = { findAllUserActivities, findUserActivityById, findUserActivityByUserId };