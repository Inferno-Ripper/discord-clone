// GET Routes

// @desc    Get all the channels
// @route   Get /channels
// @access  Private
const getChannels = (req, res) => {
	res.send('get all channels');
};

// POST Routes

// @desc    Add a channel
// @route   Post /channels/delete
// @access  Private
const addChannel = (req, res) => {
	res.send('add channel');
};

// @desc    delete a channel
// @route   Delete /channels/delete
// @access  Private
const deleteChannel = (req, res) => {
	res.send('delete channel');
};

module.exports = {
	getChannels,
	deleteChannel,
	addChannel,
};
