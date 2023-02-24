const PatientModel = require('../models/patient/patientModel')

// GET PATIENTS
const getAllPatients = async function (req, res) {
    try {
        const patient = await PatientModel.find()
         res.status(200).json(patient);
        
    } catch (error) {
         res.status(400).json("ERORR: "+error); 
    }    
}

// GET PATIENT BY ID
const getPatientById = async function (req, res) {
    try {
        const { id } = req.params
        const patient = await PatientModel.findById(id)
        res.status(200).json({ patient })
    } catch (error) {
        res.status(400).json("ERORR: "+error);
    }    
}

// POST PATIENT
const createPatient = async function (req, res) {

    const newPatient = new PatientModel(req.body)
    
    newPatient.save((err, savedInfo) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ patient: savedInfo })
    })
}

// PUT PATIENT
const updatePatient = async function (req, res) {
    console.log(req.body)
    console.log(req.params.id)
    try {
       await PatientModel.findByIdAndUpdate(req.params.id, req.body)
       
       const modifiedPatient = await PatientModel.findById(req.params.id);
       res.status(200).json(modifiedPatient)
    }
    catch (err) {
        res.status(400).send("Error"+err)
    }
}

// DELETE PATIENT
const deletePatient = async function (req, res) {
    try {
       const result = await PatientModel.findByIdAndDelete(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).send('Error'+err)
    }
}

module.exports = { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient }
