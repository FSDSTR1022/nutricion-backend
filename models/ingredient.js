const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientSchema = new Schema(
	{
		nameIngredient: String,
		grProtein: Number,
		grFats: Number,
		grCarboHydrates: Number,
		Kcal: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('ingredient', IngredientSchema);
