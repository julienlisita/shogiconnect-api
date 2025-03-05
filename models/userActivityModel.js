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
        type: DataTypes.STRING, // Ex: "CREATE_TOPIC", "POST_COMMENT", etc.
        allowNull: false,
      },
      related_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Peut être null si l'élément n'existe plus
      },
      related_type: {
        type: DataTypes.STRING,
        allowNull: true, // Ex: "Topic", "Comment", etc.
      },
      related_name: {
        type: DataTypes.STRING,
        allowNull: true, // Nom/titre de l'élément lié
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    }
  );

  UserActivity.associate = (models) => {
    UserActivity.belongsTo(models.User, {
      foreignKey: 'user_id',
      allowNull: false,
    });
  };

  return UserActivity;
};