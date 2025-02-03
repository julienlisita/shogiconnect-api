const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define(
        'Role',
        {
            // Model attributes are defined here
            label: {
                type: DataTypes.STRING,
            },
        },
        {
            updatedAt: false,
            createdAt: false,
        },
    );
    Role.associate = (models) => {
        Role.hasMany(models.User, { foreignKey: { allowNull: false, defaultValue: 1 } });
    };
    return Role;
}