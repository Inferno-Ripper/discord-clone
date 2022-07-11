const mongoose = require('mongoose');

const channelSchema = mongoose.Schema(
	{
		channel: {
			type: String,
			required: [true, 'Please Add A Message'],
		},

		user: {
			name: {
				type: String,
				required: true,
			},
			id: {
				type: String,
				required: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('channel', channelSchema);
