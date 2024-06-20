// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateUser } = require('../middleware/validation');

router.post('/register', validateUser, register);
router.post('/login', login);

module.exports = router;
