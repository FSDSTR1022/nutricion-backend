const mongoose = require('mongoose');
const {Schema} = mongoose;

const exerciseBodyPart = new Schema({
    bodyPart: String
},{timestamps:true})

module.exports = mongoose.model('exercisebodypart',exerciseBodyPart)