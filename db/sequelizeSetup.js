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
const AdminActivityModel = require('../models/AdminActivityModel.js');
const AdminStatModel = require('../models/AdminStatModel.js');
const SiteStatsModel = require('../models/siteStatModel.js')

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
    AdminStat : AdminStatModel(sequelize),
    SiteStat : SiteStatsModel(sequelize),
};

// Associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

const resetDb = process.env.NODE_ENV === "development";

// Synchronisation des tables (sans forcer la réinitialisation en prod)
sequelize.sync({ force: resetDb })
    .then(async () => {
        // Pour la seed, on ne veut pas toujours insérer les mocks, seulement si la base est vide

        // Vérifier si la table Role est vide, par exemple
        const rolesCount = await models.Role.count();

        if (rolesCount === 0) {
            console.log("Base vide, insertion des données initiales...");

            await models.Role.bulkCreate([
                { id: 1, label: "user" },
                { id: 2, label: "admin" },
            ]);

            await Promise.all(mockCategories.map(category => 
                models.Category.create(category).catch(console.log)
            ));

            await Promise.all(mockUsers.map(async user => {
                const hash = await bcrypt.hash(user.password, 10);
                user.password = hash;
                return models.User.create(user).catch(console.log);
            }));

            await Promise.all(mockTopics.map(topic => 
                models.Topic.create(topic).catch(console.log)
            ));
            await Promise.all(mockComments.map(comment => 
                models.Comment.create(comment).catch(console.log)
            ));
            await Promise.all(mockUserStats.map(userStat => 
                models.UserStat.create(userStat).catch(console.log)
            ));
            await Promise.all(mockUserActivities.map(userActivity => 
                models.UserActivity.create(userActivity).catch(console.log)
            ));
            await Promise.all(mockScheduledGames.map(game => 
                models.ScheduledGame.create(game).catch(console.log)
            ));

            await models.SiteStat.bulkCreate([
                { 
                    id: 1, 
                    totalUsers: 50, 
                    activeUsers: 50,
                    totalTopics: 20, 
                    activeTopics: 20,
                    totalComments: 50, 
                    activeComments: 50,
                    totalScheduledGames: 20,
                    activeScheduledGames: 20
                 },
            ]);

        } else {
            console.log("Base déjà initialisée, pas d'insertion de données.");
        }
    })
    .catch(error => console.log(error));

sequelize.authenticate()
.then(() => console.log('La connexion à la base de données a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, ...models };