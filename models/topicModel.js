const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Topic = sequelize.define(
        'Topic',
        {
            // Model attributes are defined here
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            updatedAt: true,
            createdAt: true,
        },
    );
    Topic.associate = (models) => {
        Topic.hasMany(models.Post, { foreignKey: { allowNull: false, defaultValue: 3 } });
        Topic.belongsTo(models.User, {foreignKey: 'UserId',allowNull: false,});
        Topic.belongsTo(models.Category, { foreignKey: 'CategoryId', allowNull: false  });
    };
    return Topic;
}