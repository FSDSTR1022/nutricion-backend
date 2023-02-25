const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseDifficultySchema = new Schema(
	{
		exerciseDifficulty: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('exercisedifficulty', exerciseDifficultySchema);
