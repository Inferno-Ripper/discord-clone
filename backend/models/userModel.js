const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		userName: {
			type: String,
			required: [true, 'Please Add A User Name'],
		},

		email: {
			type: String,
			required: [true, 'Please Add An Email Address'],
			unique: true,
		},

		password: {
			type: String,
			required: [true, 'Please add a password'],
		},

		userTag: {
			type: Number,
		},

		dateOfBirth: {
			type: String,
		},

		userColor: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
