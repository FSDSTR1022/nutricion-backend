const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = new Schema({
    name: String,
    lastName: String,
    dni: String,
    email: String,
    phone: String,
    admissionDate: Date,
    dropoutDate: Date,
    active: Boolean,
    imgUrl: String
}, { timestamps: true })

module.exports = mongoose.model('patient', PatientSchema);
