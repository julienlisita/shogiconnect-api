// utils/auth.js

import jwt from 'jsonwebtoken';
import config from '../configs/default.js';

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, roleId: user.roleId },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};