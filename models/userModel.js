const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		email: String,
		password: String,
		userType: String,
		professional: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
		name: String,
		lastName: String,
		dni: String,
		phone: String,
		isActive: Boolean,
		imgUrl: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
