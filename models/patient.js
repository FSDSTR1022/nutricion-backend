const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = new Schema(
	{
		dni: String,
		name: String,
		discipline: [
			{
				type: Schema.Types.ObjectId,
				ref: 'discipline',
			},
		],
		admissionDate: Date,
		dropoutDate: Date,
		email: String,
		phone: String,
		user: String,
		password: String,
		active: Boolean,
		imgUrl: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('patient', PatientSchema);
