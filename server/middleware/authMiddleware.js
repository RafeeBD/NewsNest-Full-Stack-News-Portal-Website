const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'newsnest_super_secret_key_2026_jwt_token_auth');

      // Attach user to request
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
      } else {
        // Fallback mock user if decoded payload exists
        req.user = {
          _id: decoded.id,
          name: decoded.name || 'Registered User',
          email: decoded.email || 'user@newsnest.com',
          role: decoded.role || 'user',
          avatar: decoded.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          bio: decoded.bio || 'News nest author',
        };
      }

      return next();
    } catch (error) {
      console.error('Auth token validation error:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid or expired token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
