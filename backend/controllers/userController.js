const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT function
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// GET Routes

// @desc    Log a user out
// @route   Get /user/logout
// @access  Public
const logout = (req, res) => {
	res.clearCookie('jwt').send();
};

// @desc    get the current user
// @route   GET /user/me
// @access  Private
const getMe = (req, res) => {
	const { email, userName, _id } = req.user;

	res.send({ email, userName, userId: _id });
};

// POST Routes

// @desc    log a user in
// @route   POST /user/login
// @access  Public
const login = async (req, res) => {
	// get the data from request body
	const { email, password, rememberMe } = req.body;

	// Check if user exists
	const user = await User.findOne({ email });

	// compare passwords and if it's correct send the user data to client
	if (user && (await bcrypt.compare(password, user.password))) {
		// generate a new jwt
		const token = generateToken(user._id);

		const cookieOptions = {
			httpOnly: true,
			// secure: true,
		};

		if (rememberMe) {
			// 30 days
			cookieOptions.maxAge = 1000 * 60 * 60 * 24 * 30;
		}

		// send the jwt in a cookie to client
		res.cookie('jwt', token, cookieOptions);

		res
			.status(201)
			.json({ userName: user.userName, email: user.email, userId: user._id });
	}
	// if user doesn't exists send
	else if (!user) {
		res.status(400).send("User Doesn't Exists");
	} else {
		// if password is incorrect send this
		res.status(400).send('Invalid Credentials');
	}
};

// @desc    Register a new user
// @route   POST /user/register
// @access  Public
const register = async (req, res) => {
	// get the data from request body
	const { userName, email, password, dateOfBirth, rememberMe } = req.body;

	// Check if all fields are filled
	if (!userName || !email || !password) {
		res.status(400).send('Please Add All Fields');
	}

	// Check if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400).send('User Already Exists');
	}

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

		const cookieOptions = {
			httpOnly: true,
			// secure: true,
		};

		if (rememberMe) {
			// 30 days
			cookieOptions.maxAge = 1000 * 60 * 60 * 24 * 30;
		}
		// send the jwt in a cookie to client
		res.cookie('jwt', token, cookieOptions);

		// send the user name and email to client
		res.status(200).json({
			userName: user.userName,
			email: user.email,
			userId: user._id,
		});
	}
};

module.exports = {
	login,
	logout,
	register,
	getMe,
};
