const express = require('express');

const {
	getMessages,
	addMessage,
} = require('../controllers/messagesController');

const router = express.Router();

// GET Routes

// @desc    Get all the messages
// @route   Get /messages/channel
// @access  Private
router.get('/:channel', getMessages);

// POST Routes

// @desc    Add a new messages
// @route   Post /messages/add
// @access  Private
router.post('/add', addMessage);

module.exports = router;
