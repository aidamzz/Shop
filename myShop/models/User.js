const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
