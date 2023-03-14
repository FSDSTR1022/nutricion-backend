const mongoose = require('mongoose');
const { Schema } = mongoose;

const RutineSchema = new Schema(
	{
		name: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		day: Date,
<<<<<<< HEAD
		professional: Schema.Types.ObjectId,
=======
		status:String,
>>>>>>> 77dd0e86c29deffb3bdf5305590ba53375c7b108
		rounds: [
			{
				order: Number,
				roundName: String,
				exercises: [
					{
						exercise: {
							type: Schema.Types.ObjectId,
							ref: 'exercise',
						},
						timeOReps: String,
					},
				],
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('rutine', RutineSchema);
