const express = require('express')
const router = express.Router()

const userController = require('../controllers/patient')

// GET PATIENTS
router.get('/', userController.getAllPatients)

// GET PATIENT BY ID
router.get('/:id', userController.getPatientById)

// POST PATIENT
router.post('/', userController.createPatient)

// PUT PATIENT
router.put('/:id', userController.putPatient)

// DELETE PATIENT
router.delete('/:id', userController.deletePatient)

module.exports = router
