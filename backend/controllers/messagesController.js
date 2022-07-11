// GET Routes

// @desc    Get all the messages
// @route   Get /messages
// @access  Private
const getMessages = (req, res) => {
	res.send('get all messages');
};

// POST Routes

// @desc    Add a new messages
// @route   Post /messages/add
// @access  Private
const addMessage = (req, res) => {
	res.send('add message');
};

module.exports = {
	getMessages,
	addMessage,
};
