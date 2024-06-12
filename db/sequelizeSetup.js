const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const mockUsers = require('./users');
const RoleModel = require('../models/roleModel');

const env = process.env.NODE_ENV;
const config = require('../configs/db-config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    port: config.port
});

const User = UserModel(sequelize);
const Role = RoleModel(sequelize);

// relations

Role.hasMany(User, {
    foreignKey: {
        defaultValue: 3,
    },
});
User.belongsTo(Role);

const resetDb = process.env.NODE_ENV === "development"

sequelize.sync({ force: resetDb })
    .then(() => {

        Role.create({ id: 1, label: "superadmin" })
        Role.create({ id: 2, label: "admin" })
        Role.create({ id: 3, label: "user" })

        mockUsers.forEach(async user => {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            User.create(user)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })
    })
    .catch((error) => {
        console.log(error)
    })

sequelize.authenticate()
.then(() => console.log('La connexion à la base de données a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))



module.exports = { sequelize ,User, Role}