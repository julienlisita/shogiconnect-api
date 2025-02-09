const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserActivity = sequelize.define(
    'UserActivity',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      activity_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Nom de la table des utilisateurs
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      related_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      related_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      updatedAt: false,
      createdAt: false,
    }
  );

  UserActivity.associate = (models) => {
    UserActivity.belongsTo(models.User, {
      foreignKey: 'UserId',
      allowNull: false,
    });
  };

  return UserActivity;
};