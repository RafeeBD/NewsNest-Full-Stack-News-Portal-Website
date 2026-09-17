const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'newsnest_super_secret_key_2026_jwt_token_auth';
  return jwt.sign(payload, secret, {
    expiresIn: '30d',
  });
};

module.exports = { generateToken };
