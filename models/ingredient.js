const mongoose = require('mongoose')
const {Schema} = mongoose;

const IngredientSchema = new Schema({
    nameIngediente: String,
    grProtein: Number,
    grFats: Number,
    grCarboHydrates: Number,
    KCal: Number
},{timestamps:true})

module.exports = mongoose.model('ingredient',IngredientSchema)