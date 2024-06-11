const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  return sequelize.define(

    'User', {
              pseudo: {
                type: DataTypes.STRING,
                allowNull: false
              },
              email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                  isEmail: true
                }
              },
              password: {
                type: DataTypes.STRING,
                allowNull: false
              },
              country: {
                type: DataTypes.STRING,
                allowNull: true
              },
              biography: {
                type: DataTypes.TEXT,
                allowNull: true
              },
              ratio: {
                type: DataTypes.FLOAT,
                allowNull: true
              },
              avatar: {
                type: DataTypes.STRING,
                allowNull: true
              },

            }, {

            },
          );
  }
