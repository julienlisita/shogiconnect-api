const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define(
        'Post',
        {
            // Model attributes are defined here
            Author: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.TEXT,
            },
        },
        {
            updatedAt: false,
            createdAt: false,
        },
    );
    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: { allowNull: false } });
        Post.belongsTo(models.Topic, { foreignKey: { allowNull: false } });     
    };
    return Post;
}