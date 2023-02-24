const mongoose = require('mongoose');
const {Schema} = mongoose;

const exerciseEquipmentSchema = new Schema({
    exerciseEquipment: String
},{timestamps:true})

module.exports = mongoose.model('exerciseequipment',exerciseEquipmentSchema)