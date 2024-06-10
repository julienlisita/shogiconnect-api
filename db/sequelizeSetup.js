const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const env = process.env.NODE_ENV;
const config = require('../configs/db-config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    port: config.port
});



sequelize.authenticate()
.then(() => console.log('La connexion à la base de données a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))



module.exports = { sequelize }