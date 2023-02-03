const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExerciseDifficultySchema = new Schema({
    exerciseDifficulty: String
},{timestamps:true})

module.exports = mongoose.model('exercisedifficulty',ExerciseDifficultySchema)