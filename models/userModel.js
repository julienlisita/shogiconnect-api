const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 0 et 50.",
            args: [0, 50],
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "email incorrect",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      biography: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            msg: "Le texte doit avoir un nombre de caractères compris entre 0 et 700.",
            args: [0, 700],
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      onDelete: 'CASCADE',
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
      hooks: {
        afterCreate: (record) => {
          delete record.dataValues.password;
        },
        afterUpdate: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );

  // Define associations
  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: { allowNull: false } });
    User.hasMany(models.UserStat, { foreignKey: 'UserId', allowNull: false,});
  };

  return User;
};