// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
}]
});

// Create User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
