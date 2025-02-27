const { UserActivity } = require("../db/sequelizeSetup");
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

module.exports = { findAllActivities, findActivityById, findActivityByUserId };