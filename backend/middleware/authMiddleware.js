const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// get token from the request header
			token = req.headers.authorization.split(' ')[1];

			// verify jwt
			const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

			// get the user from token and get user data from database by id
			req.user = await User.findById(decodedJWT.id).select('-password');

			next();
		} catch (error) {
			res.status(401).send('Not Authorized');
		}
	}

	if (!token) {
		res.status(401).send('Not authorized, no token');
	}
};

module.exports = { protectRoute };
