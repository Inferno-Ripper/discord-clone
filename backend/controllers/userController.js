const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// GET Routes

// @desc    Log a user out
// @route   Get /user/logout
// @access  Public
const logout = (req, res) => {
	res.send('logout');
};

// @desc    get the current user
// @route   GET /user/me
// @access  Private
const getMe = (req, res) => {
	res.send('get me');
};

// POST Routes

// @desc    log a user in
// @route   POST /user/login
// @access  Private
const login = (req, res) => {
	res.send('login');
};

// @desc    Register a new user
// @route   POST /user/register
// @access  Public
const register = async (req, res) => {
	// get the data from request body
	const { userName, email, password, dateOfBirth } = req.body;

	// Check if all fields are filled
	if (!userName || !email || !password) {
		res.status(400).send('Please add all fields');
	}

	// Check if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400).send('User Already Exists');
	}

	try {
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create user
		const user = await User.create({
			userName,
			email,
			password: hashedPassword,
			dateOfBirth,
		});

		if (user) {
			// generate a new jwt
			const token = generateToken(user._id);

			// send the user name and email to client
			res
				.status(201)
				.send({
					userName: user.userName,
					email: user.email,
					token,
				})
				// send the jwt in a cookie to client and redirect to the home page
				.header('auth-token', token, { maxAge: 900000 })
				.redirect('/');
		}
	} catch (error) {
		// res.status(400).send('Invalid user data');
	}
};

// Generate JWT function
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
	login,
	logout,
	register,
	getMe,
};
