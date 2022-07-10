const express = require('express');
const {
	login,
	logout,
	register,
	getMe,
} = require('../controllers/userController');
const { protectRoute } = require('../middleware/authMiddleware');

const router = express.Router();

// GET Routes

// @desc    Log a user out
// @route   Get /user/logout
// @access  Public
router.get('/logout', logout);

// @desc    get the current user
// @route   POST /user/me
// @access  Private
router.get('/me', protectRoute, getMe);

// POST Routes

// @desc    log a user in
// @route   POST /user/login
// @access  Public
router.post('/login', login);

// @desc    Register a new user
// @route   POST /user/register
// @access  Public
router.post('/register', register);

module.exports = router;
