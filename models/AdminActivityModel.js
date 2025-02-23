const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AdminActivity = sequelize.define(
    'AdminActivity',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      activity_type: {
        type: DataTypes.STRING, // "DELETE_USER", "DELETE_TOPIC", "DELETE_COMMENT", etc.
        allowNull: false,
      },
      related_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Null si l'élément n'existe plus (ex: suppression)
      },
      related_type: {
        type: DataTypes.STRING,
        allowNull: true, // "User", "Topic", "Comment", etc.
      },
      related_name: {
        type: DataTypes.STRING,
        allowNull: true, // Stocke le nom/titre de l'élément supprimé
      },
      admin_id: {
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
      timestamps: true,
    }
  );

  AdminActivity.associate = (models) => {
    AdminActivity.belongsTo(models.User, {
      foreignKey: 'admin_id',
      allowNull: false,
    });
  };

  return AdminActivity;
};