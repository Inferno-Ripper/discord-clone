const Message = require('../models/messageModel');

// GET Routes

// @desc    Get all the messages
// @route   Get /messages/channel
// @access  Private
const getMessages = async (req, res) => {
	const { channel } = req.params;

	const reformatChannel = channel.charAt(0).toUpperCase() + channel.slice(1);

	const messages = await Message.find()
		.where('channel')
		.equals(reformatChannel)
		.sort({ createdAt: -1 });

	res.status(200).send(messages);
};

// POST Routes

// @desc    Add a new messages
// @route   Post /messages/add
// @access  Private
const addMessage = async (req, res) => {
	const { channel, message, user } = req.body;

	if (!user) {
		res.status(400).send('Please Login Again');
		return;
	}

	const userExists = await Message.findById(user.userId);

	if (userExists) {
		res.status(400).send('Please Login Again');
	}

	Message.create({
		channel,
		message,
		user,
	});

	res.status(201).send('Message Added');
};

module.exports = {
	getMessages,
	addMessage,
};
