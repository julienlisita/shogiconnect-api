// services/adminStatsService.js
const { AdminStat } = require('../db/sequelizeSetup'); // Assure-toi d'importer ton modèle correctement

// Fonction pour mettre à jour le nombre d'utilisateurs supprimés par l'admin
const updateAdminStats = async (adminId, action) => {
    try {
        const adminStat = await AdminStat.findOne({ where: { AdminId: adminId } });

        if (!adminStat) {
            // Si l'admin n'a pas de statistiques encore, en créer un nouveau
            await AdminStat.create({
                AdminId: adminId,
                usersDeleted: action === 'DELETE_USER' ? 1 : 0, 
                topicsDeleted: action === 'DELETE_TOPIC' ? 1 : 0,
                commentsDeleted: action === 'DELETE_COMMENT' ? 1 : 0,
                scheduledGamesDeleted: action === 'DELETE_SCHEDULED_GAME' ? 1 : 0
                
            });
        } else {
            // Mettre à jour la statistique en fonction de l'action
            switch (action) {
                case 'DELETE_USER':
                    adminStat.usersDeleted += 1;
                    break;
                case 'DELETE_TOPIC':
                    adminStat.topicsDeleted += 1;
                    break;
                case 'DELETE_COMMENT':
                    adminStat.commentsDeleted += 1;
                    break;
                case 'DELETE_SCHEDULED_GAME':
                    adminStat.scheduledGamesDeleted += 1;
                    break;
                default:
                    console.warn(`Action inconnue pour updateAdminStats: ${action}`);
                    return;
            }
            await adminStat.save();
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des statistiques admin:', error);
        throw new Error('Impossible de mettre à jour les statistiques admin.');
    }
};

module.exports = { updateAdminStats };