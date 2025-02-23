const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AdminStat = sequelize.define(
    'AdminStat',
    {
      usersDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      topicsDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      commentsDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      gamesDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      AdminId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      updatedAt: false,
      createdAt: false,
    }
  );

  AdminStat.associate = (models) => {
    AdminStat.belongsTo(models.User, {
      foreignKey: 'AdminId',
      allowNull: false,
    });
  };

  return AdminStat;
};