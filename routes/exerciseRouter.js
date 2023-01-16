const express = require('express');
const router = express.Router();
const exerciseController = require ("../controllers2/exerciseController");

router.post("/",exerciseController.createExercise)
router.get("/",exerciseController.getAllExercises);
router.put("/",exerciseController.updateExercise);

router.post("/TipoEjercicios",exerciseController.createExerciseType)
router.get("/TipoEjercicios",exerciseController.getAllExercisesTypes)

router.post("/EquipamientoEjercicio",exerciseController.createExerciseEquipment)
router.get("/EquipamientoEjercicio",exerciseController.getAllExerciseEquipment)

module.exports = router;

