const express = require('express');
const {
	getChannels,
	deleteChannel,
	addChannel,
} = require('../controllers/channelsController');

const router = express.Router();

// GET Routes

// @desc    Get all the channels
// @route   Get /channels
// @access  Private
router.get('/', getChannels);

// POST Routes

// @desc    Add a channel
// @route   Post /channels/delete
// @access  Private
router.post('/add-channel', addChannel);

// @desc    delete a channel
// @route   Delete /channels/delete
// @access  Private
router.delete('/delete-channel', deleteChannel);

module.exports = router;
