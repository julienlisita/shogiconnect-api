const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const User = sequelize.define(
    'User', {
              pseudo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 0 et 50.",
                        args: [0, 50]
                    }
                },
              },
              email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                  isEmail: {
                    msg: "email incorrect",
                  }
                }
              },
              password: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              country: {
                type: DataTypes.STRING,
                allowNull: true
              },
              biography: {
                type: DataTypes.TEXT,
                allowNull: true,
                validate: {
                  len: {
                      msg: "Le texte  doit avoir un nombre de caractères compris entre 0 et 200.",
                      args: [0, 200]
                  }
 
                },
              },
              ratio: {
                type: DataTypes.FLOAT,
                allowNull: true,
                validate: {
                  isFloat: {
                    msg: "La note doit être un nombre décimal.",
                    },
                  min: {
                      msg: "La note ne peut pas être inférieure à 0.",
                      args: [0]
                    },
                 },
             },
              avatar: {
                type: DataTypes.STRING,
                allowNull: true
              },

            }, {

              onDelete: 'CASCADE',
              
              defaultScope: {
                attributes: { exclude: ['password'] }
              },
              scopes: {
                  withPassword: {
                      attributes: {}
                  }
              },
              // delete password from the returned data after creating or updating a record
              hooks: {
                afterCreate: (record) => {
                    delete record.dataValues.password;
                },
                afterUpdate: (record) => {
                    delete record.dataValues.password;
                },
            }

            },
          );

          // Define associations
          User.associate = (models) => 
          {
            User.belongsTo(models.Role, { foreignKey: { allowNull: false } });
          };

          return User;
  }
