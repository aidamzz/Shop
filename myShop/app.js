const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const { validateUser } = require('./middleware/validation');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// HTTP request logger
app.use(morgan('dev'));

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

// Import routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/authRoutes');

// Serve static files from 'public/uploads' directory
app.use('/uploads', express.static('public/uploads'));

// Use Auth Routes
app.use('/api/auth', authRoutes);

// Use Product Routes
app.use('/api/products', productRoutes);

// Use the authentication middleware for protected routes
app.use('/api/products', auth, productRoutes);

// Error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
