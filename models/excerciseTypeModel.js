const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExerciseTypeSchema = new Schema({
    exerciseType: String
},{timestamps:true})


module.exports = mongoose.model('exercisetypes',ExerciseTypeSchema)