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
	const { email, userName, _id, userTag, userColor } = req.user;

	res.status(200).send({ email, userName, userId: _id, userTag, userColor });
};

// POST Routes

// @desc    log a user in
// @route   POST /user/login
// @access  Public
const login = async (req, res) => {
	// get the data from request body
	const { email, password, rememberMe } = req.body;

	// Check if user exists
	let user = null;

	if (email) {
		user = await User.findOne({ email });
	}

	// compare passwords and if it's correct send the user data to client
	if (user && (await bcrypt.compare(password, user.password))) {
		// generate a new jwt
		const token = generateToken(user._id);

		const cookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		};

		if (rememberMe) {
			// 30 days
			cookieOptions.maxAge = 1000 * 60 * 60 * 24 * 30;
		}

		// send the jwt in a cookie to client
		res.cookie('jwt', token, cookieOptions);

		res.status(200).json({
			userName: user.userName,
			email: user.email,
			userId: user._id,
			userTag: user.userTag,
			userColor: user.userColor,
		});
	}
	// if user doesn't exists send
	else if (!user) {
		res.status(404).send("User Doesn't Exists");
	} else {
		// if password is incorrect send this
		res.status(401).send('Invalid Credentials');
	}
};

// @desc    Register a new user
// @route   POST /user/register
// @access  Public
const register = async (req, res) => {
	// get the data from request body
	const {
		userName,
		email,
		password,
		userTag,
		dateOfBirth,
		rememberMe,
		userColor,
	} = req.body;

	// Check if all fields are filled
	if (!userName || !email || !password) {
		res.status(400).send('Please Add All Fields');
	}

	// Check if user already exists
	// Check if user exists
	let userExists = null;

	if (email) {
		userExists = await User.findOne({ email });
	}

	if (userExists) {
		res.status(400).send('User Already Exists');
		return;
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		userName,
		email,
		password: hashedPassword,
		userTag,
		dateOfBirth,
		userColor,
	});

	if (user) {
		// generate a new jwt
		const token = generateToken(user._id);

		const cookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
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
			userColor: user.userColor,
			userTag: user.userTag,
		});
	}
};

// PUT Routes

// @desc    log a user in
// @route   PUT /user/update
// @access  Private
const updateUser = async (req, res) => {
	const { field } = req.params;
	const { userId } = req.body;

	if (field === 'userName' || field === 'userEmail' || field === 'userColor') {
		const { value } = req.body;

		// change user name
		if (field === 'userName') {
			// find user by id and update the user name
			User.findByIdAndUpdate(
				userId,
				{
					userName: value,
				},
				{ new: true },
				(err, docs) => {
					if (err) {
						// if there is an error send it to the client
						res.status(400).send(err);
					} else {
						// send the updated user name to client
						res.status(200).send(docs.userName);
					}
				}
			);
		}

		// change user email
		else if (field === 'userEmail') {
			// find user by id and update the user email address
			User.findByIdAndUpdate(
				userId,
				{
					email: value,
				},
				{ new: true },
				(err, docs) => {
					if (err) {
						// if there is an error send it to the client
						res.status(400).send(err);
					} else {
						// send the updated user email to client
						res.status(200).send(docs.email);
					}
				}
			);
		}

		// change user color
		else if (field === 'userColor') {
			let newValue = value;

			if (value.charAt(0) === '#') {
				newValue = value.substring(1);
			}

			// find user by id and update the user color
			User.findByIdAndUpdate(
				userId,
				{
					userColor: newValue,
				},
				{ new: true },
				(err, docs) => {
					if (err) {
						// if there is an error send it to the client
						res.status(400).send(err);
					} else {
						// send the updated user color to client
						res.status(200).send(docs.userColor);
					}
				}
			);
		}
	}

	// change user password
	else if (field === 'userPassword') {
		const { oldUserPassword, newUserPassword } = req.body;

		const user = await User.findById(userId);

		const passwordMatched = await bcrypt.compare(
			oldUserPassword,
			user.password
		);

		if (!passwordMatched) {
			return res.status(401).send('Old Password Is Incorrect');
		}

		if (passwordMatched) {
			// Hash password
			const salt = await bcrypt.genSalt(10);
			const newHashedPassword = await bcrypt.hash(newUserPassword, salt);

			const passwordUpdated = await user
				.updateOne({
					password: newHashedPassword,
				})
				.catch((err) => res.status(400).send(err));

			res.status(200).send('Password Updated successfully');
		}
	}
};

module.exports = {
	login,
	logout,
	register,
	getMe,
	updateUser,
};
