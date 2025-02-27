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
                break;
            case "DELETE_USER":
                siteStat.totalUsers = Math.max(0, siteStat.totalUsers - 1);
                break;
            case "ADD_TOPIC":
                siteStat.totalTopics += 1;
                break;
            case "DELETE_TOPIC":
                siteStat.totalTopics = Math.max(0, siteStat.totalTopics - 1);
                break;
            case "ADD_COMMENT":
                siteStat.totalComments += 1;
                break;
            case "DELETE_COMMENT":
                siteStat.totalComments = Math.max(0, siteStat.totalComments - 1);
                break;
            case "ADD_SCHEDULED_GAME":
                siteStat.totalScheduledGames += 1;
                break;
            case "DELETE_SCHEDULED_GAME":
                siteStat.totalScheduledGames = Math.max(0, siteStat.totalScheduledGames - 1);
                break;
        }

        siteStat.lastUpdated = new Date();
        await siteStat.save();
    } catch (error) {
        console.error("Erreur lors de la mise à jour des statistiques du site :", error);
    }
};

module.exports = { updateSiteStats };