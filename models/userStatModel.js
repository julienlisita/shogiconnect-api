const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserStat = sequelize.define(
    'UserStat',
    {
      wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      losses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      draws: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      UserId: {
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

  UserStat.associate = (models) => {
    UserStat.belongsTo(models.User, {
      foreignKey: 'UserId',
      allowNull: false,
    });
  };

  return UserStat;
};