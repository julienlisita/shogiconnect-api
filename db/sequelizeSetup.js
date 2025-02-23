// sequelizeSetup.js

const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const UserModel = require('../models/userModel');
const RoleModel = require('../models/roleModel');
const CategoryModel = require('../models/categoryModel');
const TopicModel = require('../models/topicModel');
const CommentModel = require('../models/commentModel');
const UserStatModel = require('../models/userStatModel');
const UserActivityModel = require('../models/userActivityModel');
const ScheduledGameModel = require('../models/scheduledGameModel');
const AdminActivityModel = require('../models/AdminActivityModel.js')

const mockUsers = require('./users');
const mockCategories = require('./categories');
const mockTopics = require('./topics');
const mockComments = require('./comments');
const mockUserStats = require('./userStats');
const mockUserActivities = require('./userActivities');
const mockScheduledGames = require('./scheduledGames.js');

const config = require('../configs/default.js');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
    port: config.db.port
});

const models = {
    User : UserModel(sequelize),
    Role : RoleModel(sequelize),
    Category : CategoryModel(sequelize),
    Topic : TopicModel(sequelize),
    Comment: CommentModel(sequelize),
    UserStat : UserStatModel(sequelize),
    UserActivity : UserActivityModel(sequelize),
    ScheduledGame : ScheduledGameModel(sequelize),
    AdminActivity : AdminActivityModel(sequelize),
};

// Initialisation des associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

const resetDb = process.env.NODE_ENV === "development";
sequelize.sync({ force: resetDb })
    .then(async () => {
        
        await models.Role.bulkCreate([
            { id: 1, label: "user" },
            { id: 2, label: "admin" },
        ]);

        await Promise.all(mockCategories.map(category => 
            models.Category.create(category)
                .catch(error => console.log(error))
        ));

        await Promise.all(mockUsers.map(async user => {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            return models.User.create(user)
                .catch(error => console.log(error));
        }));
        await Promise.all(mockTopics.map(topic => 
            models.Topic.create(topic)
                .catch(error => console.log(error))
        ));
        await Promise.all(mockComments.map(comment => 
            models.Comment.create(comment)
                .catch(error => console.log(error))
        ));

        await Promise.all(mockUserStats.map(userStat => 
            models.UserStat.create(userStat)
                .catch(error => console.log(error))
        ));
        await Promise.all(mockUserActivities.map(userActivity => 
            models.UserActivity.create(userActivity)
                .catch(error => console.log(error))
        ));
        await Promise.all(mockScheduledGames.map(game => 
            models.ScheduledGame.create(game)
                .catch(error => console.log(error))
        ));
    })
    .catch(error => {
        console.log(error);
    });

sequelize.authenticate()
.then(() => console.log('La connexion à la base de données a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, ...models};