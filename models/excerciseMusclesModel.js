const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExcerciseMusclesModel = new Schema({
    muscles: String
},{timestamps:true})

module.exports = mongoose.model('exercisemuscles',ExcerciseMusclesModel)