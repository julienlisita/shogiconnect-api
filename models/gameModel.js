const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Game = sequelize.define(
        'Game',
        {
            // Model attributes are defined here
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            level: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rendezVousAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            updatedAt: true,
            createdAt: true,
        }
    );

    Game.associate = (models) => {
        Game.belongsTo(models.User, { foreignKey: 'OrganizerId', as: 'Organizer' });
        Game.belongsTo(models.User, { foreignKey: 'ParticipantId', as: 'Participant' });
    };

    return Game;
};