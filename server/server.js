const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'NewsNest Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.send('Welcome to NewsNest Portal Backend API');
});

// 404 Error handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route Not Found - ${req.originalUrl}` });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 NewsNest Server running on port ${PORT}`);
  console.log(`🌐 API Endpoint: http://localhost:${PORT}/api/news`);
  console.log(`=================================`);
});
