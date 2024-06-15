const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const UserModel = require('../models/userModel');
const RoleModel = require('../models/roleModel');
const CategoryModel = require('../models/categoryModel');
const TopicModel = require('../models/topicModel');
const PostModel = require('../models/postModel');

const mockUsers = require('./users');
const mockCategories = require('./categories');

const env = process.env.NODE_ENV;
const config = require('../configs/db-config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    port: config.port
});

const models = {
    User : UserModel(sequelize),
    Role : RoleModel(sequelize),
    Category : CategoryModel(sequelize),
    Topic : TopicModel(sequelize),
    Post : PostModel(sequelize),
};

// Setup associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

const resetDb = process.env.NODE_ENV === "development";

sequelize.sync({ force: resetDb })
    .then(() => {

        models.Role.create({ id: 1, label: "superadmin" })
        models.Role.create({ id: 2, label: "admin" })
        models.Role.create({ id: 3, label: "user" })

        mockCategories.forEach(async category => {
            models.Category.create(category)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })

        mockUsers.forEach(async user => {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            models.User.create(user)
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


module.exports = { sequelize, ...models};