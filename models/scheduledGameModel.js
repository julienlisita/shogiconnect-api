const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ScheduledGame = sequelize.define(
        'ScheduledGame',
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

    ScheduledGame.associate = (models) => {
        ScheduledGame.belongsTo(models.User, { foreignKey: 'OrganizerId', as: 'Organizer' });
        ScheduledGame.belongsTo(models.User, { foreignKey: 'ParticipantId', as: 'Participant' });
    };

    return ScheduledGame;
};