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
    Category.associate = (models) => {
        Category.hasMany(models.Topic, { 
            foreignKey: { allowNull: false }, 
            onDelete: 'CASCADE' 
        });
    };
    return Category;
}