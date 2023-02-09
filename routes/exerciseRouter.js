const express = require('express');
const router = express.Router();
const exerciseController = require ("../controllers/exerciseController");


router.get("/",exerciseController.getAllExercises);

router.get("/Ejercicio",exerciseController.getExerciseAtributes);//pasandole el id del ejercicio como parametro
router.delete("/Ejercicio",exerciseController.deleteExcercise)
router.post("/Ejercicio",exerciseController.createExercise)
router.put("/Ejercicio",exerciseController.updateExercise);


router.post("/TipoEjercicios",exerciseController.createExerciseType)
router.get("/TipoEjercicios",exerciseController.getAllExercisesTypes)

router.post("/EquipamientoEjercicio",exerciseController.createExerciseEquipment)
router.get("/EquipamientoEjercicio",exerciseController.getAllExerciseEquipment)

router.post("/ParteCuerpo",exerciseController.createBodyPart)
router.get("/ParteCuerpo",exerciseController.getAllBodyPart)

router.post("/DificultadEjercicio",exerciseController.createExerciseDifficulty)
router.get("/DificultadEjercicio",exerciseController.getAllExerciseDifficulty)

router.post("/MusculosEjercicio",exerciseController.createExerciseMuscle)
router.get("/MusculosEjercicio",exerciseController.getAllExerciseMuscle)

module.exports = router;

