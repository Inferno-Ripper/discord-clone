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
const register = (req, res) => {
	res.send('register');
};

module.exports = {
	login,
	logout,
	register,
	getMe,
};
