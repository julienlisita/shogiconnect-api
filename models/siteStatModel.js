const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SiteStats = sequelize.define(
        "SiteStats", 
        {
            // Statistiques Utilisateurs
            totalUsers: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            activeUsers: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            // Statistiques Forum
            totalTopics: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            activeTopics: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            totalComments: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            activeComments: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            // Statistiques Parties
            totalScheduledGames: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            activeScheduledGames: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
        {
            updatedAt: true,
        }
    );
  
    return SiteStats;
  };