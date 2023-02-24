const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseTypeSchema = new Schema({
    exerciseType: String
},{timestamps:true})


module.exports = mongoose.model('exercisetypes',exerciseTypeSchema)
