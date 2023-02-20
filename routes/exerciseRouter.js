const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/', exerciseController.createExercise);
router.get('/', exerciseController.getAllExercises);
router.put('/', exerciseController.updateExercise);

router.get('/NuevoEjercicio', exerciseController.getExerciseAtributes);

router.post('/TipoEjercicios', exerciseController.createExerciseType);
router.get('/TipoEjercicios', exerciseController.getAllExercisesTypes);

router.post(
	'/EquipamientoEjercicio',
	exerciseController.createExerciseEquipment
);
router.get(
	'/EquipamientoEjercicio',
	exerciseController.getAllExerciseEquipment
);

router.post('/ParteCuerpo', exerciseController.createBodyPart);
router.get('/ParteCuerpo', exerciseController.getAllBodyPart);

router.post(
	'/DificultadEjercicio',
	exerciseController.createExerciseDifficulty
);
router.get('/DificultadEjercicio', exerciseController.getAllExerciseDifficulty);

router.post('/MusculosEjercicio', exerciseController.createExerciseMuscle);
router.get('/MusculosEjercicio', exerciseController.getAllExerciseMuscle);

module.exports = router;
