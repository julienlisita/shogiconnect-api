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
        Topic.hasMany(models.Comment, { 
            onDelete: 'CASCADE', 
            foreignKey: 'TopicId', 
            allowNull: false 
        });
        Topic.belongsTo(models.User, { foreignKey: {allowNull: false  }});
        Topic.belongsTo(models.Category, { foreignKey: {allowNull: false  }});
    };
    return Topic;
}