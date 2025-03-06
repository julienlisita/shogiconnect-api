const { SiteStat } = require('../db/sequelizeSetup');

// Fonction pour récupérer les statistiques du site
const getSiteStats = async (req, res) => {
    try {
        const siteStats = await SiteStat.findOne();

        if (!siteStats) {
            return res.status(404).json({ message: "Site statistics not found" });
        }

        res.status(200).json({data: siteStats});
    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques du site :", error);
        res.status(500).json({ message: "Error fetching site statistics" });
    }
};

module.exports = { getSiteStats };