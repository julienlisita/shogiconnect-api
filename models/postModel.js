const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define(
        'Post',
        {
            // Model attributes are defined here
            author: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.TEXT,
            },
        },
        {
            updatedAt: true,
            createdAt: true,
        },
    );
    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: { allowNull: false } });
        Post.belongsTo(models.Topic, { foreignKey: { allowNull: false } });     
    };
    return Post;
}