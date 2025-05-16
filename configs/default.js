// default.js
require('dotenv').config(); 

const config = {
  app: {
    port: process.env.PORT || 3000, 
    env: process.env.NODE_ENV || 'development', 
  },
  db: {
    dialect: process.env.DB_DIALECT || 'mysql', 
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root', 
    database: process.env.DB_NAME || 'shogi',
    port: parseInt(process.env.DB_PORT, 10) || 8889,
  },
  jwt: {
    secret: process.env.JWT_SECRET || '5rM7Cz)@I]N(/=|=rmNr^6kmEiDMG^',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h', 
  },
};

module.exports = config;