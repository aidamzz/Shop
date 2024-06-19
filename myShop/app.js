// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});
