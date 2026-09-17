const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// Memory store fallback if mongo is disconnected
const inMemoryUsers = [];

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: bio || 'News enthusiast and author at NewsNest.',
      });

      const token = generateToken({ id: user._id, email: user.email, name: user.name, role: user.role });

      return res.status(201).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          role: user.role,
        },
      });
    } catch (dbError) {
      // Fallback for memory mode
      const existing = inMemoryUsers.find((u) => u.email === email);
      if (existing) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        _id: 'user_' + Date.now(),
        name,
        email,
        password: hashedPassword,
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: bio || 'News author at NewsNest',
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      inMemoryUsers.push(newUser);

      const token = generateToken({ id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role });

      return res.status(201).json({
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          bio: newUser.bio,
          role: newUser.role,
        },
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration: ' + error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken({ id: user._id, email: user.email, name: user.name, role: user.role });

        return res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            bio: user.bio,
            role: user.role,
          },
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    } catch (dbErr) {
      // Memory fallback check
      const memUser = inMemoryUsers.find((u) => u.email === email);
      if (memUser && (await bcrypt.compare(password, memUser.password))) {
        const token = generateToken({ id: memUser._id, email: memUser.email, name: memUser.name, role: memUser.role });
        return res.json({
          token,
          user: {
            _id: memUser._id,
            name: memUser.name,
            email: memUser.email,
            avatar: memUser.avatar,
            bio: memUser.bio,
            role: memUser.role,
          },
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login: ' + error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (user) {
        return res.json(user);
      }
    } catch (dbErr) {}

    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, avatar, password } = req.body;

    try {
      const user = await User.findById(req.user._id);

      if (user) {
        user.name = name || user.name;
        user.bio = bio !== undefined ? bio : user.bio;
        user.avatar = avatar || user.avatar;

        if (password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        const token = generateToken({ id: updatedUser._id, email: updatedUser.email, name: updatedUser.name, role: updatedUser.role });

        return res.json({
          token,
          user: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            bio: updatedUser.bio,
            role: updatedUser.role,
          },
        });
      }
    } catch (dbErr) {}

    // Fallback response if in-memory user
    return res.json({
      token: generateToken({ id: req.user._id, email: req.user.email, name: name || req.user.name, role: req.user.role }),
      user: {
        _id: req.user._id,
        name: name || req.user.name,
        email: req.user.email,
        avatar: avatar || req.user.avatar,
        bio: bio || req.user.bio,
        role: req.user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
