const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
	{
		channel: {
			type: String,
			required: [true, 'Please Add A Channel Name'],
		},

		message: {
			type: String,
			required: [true, 'Please Add A Message'],
		},

		user: {
			userName: {
				type: String,
				required: true,
			},
			userId: {
				type: String,
				required: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('message', messageSchema);
