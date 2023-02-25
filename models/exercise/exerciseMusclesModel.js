const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseMusclesModel = new Schema(
	{
		muscle: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('exercisemuscles', exerciseMusclesModel);
