const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Category = sequelize.define(
        'Category',
        {
            // Model attributes are defined here
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            updatedAt: false,
            createdAt: false,
        },
    );
    return Category;
}