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
		status:String,
		satisfaction:Number,
		feedback:String,
		professional: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
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
