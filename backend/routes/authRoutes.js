const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// @desc    login / reqgister with google oauth20
// @route   GET /auth/google
// @access  Public
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc    login / reqgister with google oauth20
// @route   GET /auth/google/callback
// @access  Public
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: 'http://localhost:3000',
		failureRedirect: '/login',
	})
);

// @desc    logout
// @route   GET /auth/logout
// @access  Public

router.post('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

router.get('/login', async (req, res) => {
	if (req.user) {
		const displayName = req.user.displayName;
		const email = req.user.emails[0].value;

		try {
			// Check if user already exists
			const userExists = await User.findOne({ email });

			// Generate JWT function
			const generateToken = (id) => {
				return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
			};

			const generateRandomNumbers = () => {
				let randomNumbers = [];

				// generates 5 random numbers
				for (let i = 0; i < 5; i++) {
					randomNumbers.push(Math.floor(Math.random() * 9));
				}

				randomNumbers = randomNumbers.toLocaleString().replace(/\,/g, '');
				randomNumbers = Number(randomNumbers);

				return randomNumbers;
			};

			// generates random color
			const randomColor = Math.floor(Math.random() * 16777215).toString(16);

			if (userExists) {
				// generate a new jwt
				const token = generateToken(userExists._id);

				// send the jwt in a cookie to client
				res.cookie('jwt', token, {
					httpOnly: true,
					// secure: true,
				});

				// send the auth provider in a cookie to client
				res.cookie('auth-provider', 'google', {
					// httpOnly: true,
					// secure: true,
				});

				res.status(201).json({
					userName: userExists.userName,
					email: userExists.email,
					userId: userExists._id,
					userTag: userExists.userTag,
					userColor: userExists.userColor,
					provider: 'google',
				});
			} else {
				// Create user
				const user = await User.create({
					userName: displayName,
					email: email,
					userTag: generateRandomNumbers(),
					dateOfBirth: null,
					userColor: randomColor,
				});

				// generate a new jwt
				const token = generateToken(user._id);

				// send the jwt in a cookie to client
				res.cookie('jwt', token, {
					httpOnly: true,
					// secure: true,
				});

				// send the auth provider in a cookie to client
				res.cookie('auth-provider', 'google', {
					// httpOnly: true,
					// secure: true,
				});

				res.status(201).json({
					userName: user.userName,
					email: user.email,
					userId: user._id,
					userTag: user.userTag,
					userColor: user.userColor,
					provider: 'google',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
});

module.exports = router;
