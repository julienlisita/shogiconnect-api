// utils/auth.js

const jwt = require('jsonwebtoken');
const config = require ('../configs/default.js');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, roleId: user.RoleId, username: user.username },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

module.exports = {generateToken};