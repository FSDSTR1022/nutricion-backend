const express = require('express')
const router = express.Router()

const userController = require('../controllers/professional')

// GET PROFESSIONAL
router.get('/', userController.getAllProfessionals)

// GET PROFESSIONAL BY ID
router.get('/:id', userController.getProfessionalById)

// POST PROFESSIONAL
router.post('/', userController.createProfessional)

// PUT PROFESSIONAL
router.put('/:id', userController.putProfessional)

// DELETE PROFESSIONAL
router.delete('/:id', userController.deleteProfessional)

module.exports = router