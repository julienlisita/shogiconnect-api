const { AdminActivity } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllAdminActivities = async (req, res) => {
    try {
        const result = await AdminActivity.findAll();
        return res.json({message: "Activités admin trouvées", data: result });
    } catch (error) {
        return errorHandler(error, res);
    }
};

const findAdminActivityById = async (req, res) => {
    try {
        const result = await AdminActivity.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Activité admin non trouvée" });
        }
        return res.json({ message: "Activités  admin trouvées", data: result });
    } catch (error) {
        return errorHandler(error, res);
    }
};

const findAdminActivityByAdminId = async (req, res) => {
    try {
        const { userId } = req.params;

        const activities = await AdminActivity.findAll({
            where: { admin_id: userId },
        });

        if (!activities.length) {
            return res.status(404).json({ message: "Aucune activité admin trouvée pour cet utilisateur." });
        }

        return res.json({ message: "Activités admin trouvées", data: activities });
    } catch (error) {
        return errorHandler(error, res);
    }
};

module.exports = { findAllAdminActivities, findAdminActivityById, findAdminActivityByAdminId };