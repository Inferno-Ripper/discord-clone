const { findById } = require('../models/channelModel');
const Channel = require('../models/channelModel');
const Message = require('../models/messageModel');

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
	// get the channel id from the request
	const { channelId } = req.params;

	// find the channel name by the channel id
	const findChannelName = await Channel.findById(channelId);

	// delete the channel by channel id
	const deleteChannel = await Channel.findByIdAndDelete(channelId);

	// delete all the messages where the channel is equal to findChannelName.name
	const deleteMessages = await Message.deleteMany({
		channel: findChannelName.channel,
	});

	res.status(204);
};

module.exports = {
	getChannels,
	deleteChannel,
	addChannel,
};
