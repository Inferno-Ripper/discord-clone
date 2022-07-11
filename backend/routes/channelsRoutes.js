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
router.post('/add', addChannel);

// @desc    delete a channel
// @route   Delete /channels/delete-channel/:id
// @access  Private
router.delete('/delete-channel/:id', deleteChannel);

module.exports = router;
