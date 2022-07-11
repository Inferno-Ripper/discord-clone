const { findById } = require('../models/channelModel');
const Channel = require('../models/channelModel');

// GET Routes

// @desc    Get all the channels
// @route   Get /channels
// @access  Private
const getChannels = async (req, res) => {
	const channels = await Channel.find().select('channel');

	res.send(channels);
};

// POST Routes

// @desc    Add a channel
// @route   Post /channels/delete
// @access  Private
const addChannel = async (req, res) => {
	// reformating the string
	let newChannelName = req.body.channel;

	newChannelName =
		newChannelName.charAt(0).toUpperCase() + newChannelName.slice(1);

	const channelExists = await Channel.findOne({ channel: newChannelName });

	if (channelExists) {
		res.status(400).send(`${newChannelName} Already Exists`);
		return;
	}

	const newChannel = await Channel.create({
		...req.body,
		channel: newChannelName,
	});

	if (newChannel) {
		res.status(201).send({ channel: newChannel.channel, _id: newChannel._id });
	}
};

// @desc    delete a channel
// @route   Delete /channels/delete
// @access  Private
const deleteChannel = async (req, res) => {
	const deleteChannel = await Channel.findByIdAndDelete(req.params.id);
	res.status(204).send('Channel Deleted');
};

module.exports = {
	getChannels,
	deleteChannel,
	addChannel,
};
