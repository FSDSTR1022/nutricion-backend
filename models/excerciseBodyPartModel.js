const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExcerciseBodyPart = new Schema({
    bodyPart: String
},{timestamps:true})

module.exports = mongoose.model('exercisebodypart',ExcerciseBodyPart)