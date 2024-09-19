const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Comment = sequelize.define(
        'Comment',
        {
            // Model attributes are defined here
            content: {
                type: DataTypes.TEXT,
            },
        },
        {
            updatedAt: true,
            createdAt: true,
        },
    );
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, { foreignKey: { allowNull: false } });
        Comment.belongsTo(models.Topic, { 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE' 
        });
    };
    return Comment;
}