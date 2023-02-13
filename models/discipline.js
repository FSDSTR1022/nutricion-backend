const mongoose = require('mongoose');
const { Schema } = mongoose;

const DisciplineSchema = new Schema(
	{
		name: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('discipline', DisciplineSchema);
