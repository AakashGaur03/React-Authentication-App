const express = require('express');
const { signup, login, getAllUsers } = require('../controller/user.controller');


const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Get all users route
router.get('/', getAllUsers);

module.exports = router;
