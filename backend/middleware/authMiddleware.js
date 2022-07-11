const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async (req, res, next) => {
	// get jwt cookie from the client request
	const token = req.cookies.jwt;

	if (token) {
		try {
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
		// res.status(401).json('Not authorized, no JWT');
		res.redirect('http://localhost:3000/login');
	}
};

module.exports = { protectRoute };
