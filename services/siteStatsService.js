const { SiteStat } = require("../db/sequelizeSetup");

const updateSiteStats = async (action) => {
    try {
        let siteStat = await SiteStat.findOne();

        if (!siteStat) {
            siteStat = await SiteStat.create({});
        }

        switch (action) {
            case "ADD_USER":
                siteStat.totalUsers += 1;
                siteStat.activeUsers += 1;
                break;
            case "DELETE_USER":
                siteStat.activeUsers = Math.max(0, siteStat.activeUsers - 1);
                break;
            case "ADD_TOPIC":
                siteStat.totalTopics += 1;
                siteStat.activeTopics += 1;
                break;
            case "DELETE_TOPIC":
                siteStat.activeTopics = Math.max(0, siteStat.activeTopics - 1);
                break;
            case "ADD_COMMENT":
                siteStat.totalComments += 1;
                siteStat.activeComments += 1;
                break;
            case "DELETE_COMMENT":
                siteStat.activeComments = Math.max(0, siteStat.activeComments - 1);
                break;
            case "ADD_SCHEDULED_GAME":
                siteStat.totalScheduledGames += 1;
                siteStat.activeScheduledGames += 1;
                break;
            case "DELETE_SCHEDULED_GAME":
                siteStat.activeScheduledGames = Math.max(0, siteStat.activeScheduledGames - 1);
                break;
        }

        await siteStat.save();
    } catch (error) {
        console.error("Erreur lors de la mise à jour des statistiques du site :", error);
    }
};

module.exports = { updateSiteStats };