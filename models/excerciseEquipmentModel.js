const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseEquipmentSchema = new Schema(
	{
		exerciseEquipment: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('exerciseequipment', ExerciseEquipmentSchema);
