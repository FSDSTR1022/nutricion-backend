const express = require('express')
const router = express.Router()

const userController = require('../controllers/discipline')

// GET DISCIPLINES
router.get('/', userController.getAllDisciplines)

// GET DISCIPLINE BY ID
router.get('/:id', userController.getDisciplineById)

// POST DISCIPLINE
router.post('/', userController.createDiscipline)

// PUT DISCIPLINE
router.put('/:id', userController.putDiscipline)

// DELETE DISCIPLINE
router.delete('/:id', userController.deleteDiscipline)

module.exports = router