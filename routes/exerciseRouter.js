const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/', exerciseController.createExercise); //
router.get('/', exerciseController.getAllExercises); //
router.put('/', exerciseController.updateExercise); //
router.delete('/', exerciseController.deleteExercise); //
router.get('/exerciseAtributes', exerciseController.getExerciseAtributes); //

router.post('/exerciseEquipment', exerciseController.createExerciseEquipment);
router.get('/exerciseEquipment', exerciseController.getAllExerciseEquipment);

router.post('/exerciseType', exerciseController.createExerciseType); ////////////////////////
router.get('/exerciseType', exerciseController.getAllexercisesTypes); ////////////////////////

router.post('/exerciseDifficult', exerciseController.createExerciseDifficulty);
router.get('/exerciseDifficult', exerciseController.getAllExerciseDifficulty);

router.post('/exerciseMucle', exerciseController.createExerciseMuscle);
router.get('/exerciseMucle', exerciseController.getAllExerciseMuscle);

router.post('/bodyPart', exerciseController.createBodyPart);
router.get('/bodyPart', exerciseController.getAllBodyPart);

module.exports = router;
