const { UserStat } = require("../db/sequelizeSetup");

const updateUserStats = async (userId, action) => {
    try {
        // Trouver ou créer les statistiques de l'utilisateur
        let userStat = await UserStat.findOne({ where: { UserId: userId } });

        if (!userStat) {
            userStat = await UserStat.create({ UserId: userId });
        }

        // Mettre à jour les statistiques en fonction de l'action
        switch (action) {
            case "CREATE_SCHEDULED_GAME":
                userStat.totalScheduledGamesCreated += 1;
                break;
            case "DELETE_SCHEDULED_GAME":
                userStat.totalScheduledGamesCreated = Math.max(0, userStat.totalScheduledGamesCreated - 1);
                break;
            case "JOIN_SCHEDULED_GAME":
                userStat.totalScheduledGamesJoined += 1;
                break;
            case "LEAVE_SCHEDULED_GAME":
                userStat.totalScheduledGamesJoined = Math.max(0, userStat.totalScheduledGamesJoined - 1);
                break;
            case "CREATE_TOPIC":
                userStat.totalTopicsCreated += 1;
                break;
            case "DELETE_TOPIC":
                userStat.totalTopicsCreated = Math.max(0, userStat.totalTopicsCreated - 1);
                break;
            case "CREATE_COMMENT":
                userStat.totalCommentsCreated += 1;
                break;
            case "DELETE_COMMENT":
                userStat.totalCommentsCreated = Math.max(0, userStat.totalCommentsCreated - 1);
                break;
            case "WIN_GAME":
                userStat.wins += 1;
                userStat.score += 10; // Exemple : +10 points pour une victoire
                break;
            case "LOSE_GAME":
                userStat.losses += 1;
                userStat.score = Math.max(0, userStat.score - 5); // Exemple : -5 points pour une défaite
                break;
            case "DRAW_GAME":
                userStat.draws += 1;
                userStat.score += 2; // Exemple : +2 points pour un match nul
                break;
        }

        // Mettre à jour la date de dernière modification
        userStat.lastUpdated = new Date();
        await userStat.save();
    } catch (error) {
        console.error("Erreur lors de la mise à jour des statistiques de l'utilisateur :", error);
    }
};

module.exports = { updateUserStats };