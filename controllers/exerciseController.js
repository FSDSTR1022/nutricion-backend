const ExerciseModel = require('../models/exerciseModel');
const ExerciseType = require('../models/excerciseTypeModel');
const ExerciseEquipment = require('../models/excerciseEquipmentModel');
const BodyPart = require('../models/excerciseBodyPartModel');
const ExerciseDifficult = require('../models/excerciseDifficultyModel');
const ExerciseMucle = require('../models/excerciseMusclesModel');

const getAllExercises = async (req, res) => {
	try {
		const result = await ExerciseModel.find(req.query)
			.populate('exerciseType')
			.populate('equipments')
			.populate('bodyParts')
			.populate('difficulty')
			.populate('muscles');

		res.json(result);
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log(error);
		res.json('ERORR');
	}
};

const createExercise = async (req, res) => {
	const newExercise = new ExerciseModel(req.body);
	const save = await newExercise.save();
	res.json(save);
};

const updateExercise = async (req, res) => {
	console.log('PARAMS: ', req.params);
	//{}
	console.log('BODY: ', req.body);
	/* {
                                        name: 'Ejercicio Modificado',
                                        bodyPart: [ { _id: '63c5d88935c2960ff95f6854' } ]
                                      } */
	console.log('Query: ', req.query);
	//->  { id: '63d7d0f4f5dca7a34c4c8bf0' }
	console.log('ID: ', req.query.id);
	// -> 63d7d0f4f5dca7a34c4c8bf0

	try {
		let resuesta = await ExerciseModel.findByIdAndUpdate(
			req.query.id,
			req.body
		);

		console.log('Respuesta BD: ', resuesta);

		const exercise = await ExerciseModel.findById(req.query.id);

		res.json(exercise);
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log(error);
		res.json('ERORR');
	}
};

const deleteExcercise = async (req, res) => {
	try {
		let respuesta = await ExerciseModel.findByIdAndDelete(req.query._id);

		if (!respuesta) {
			res.status(404).json('No hay Ejercicio con ese ID');
		} else {
			res.json(respuesta);
		}
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log('Error en catch: ', error);
		res.json('ERORR al guardar');
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////

const getExerciseAtributes = async (req, res) => {
	try {
		let ExerciseAtributes = {};

		ExerciseAtributes.exerciseType = await ExerciseType.find();
		ExerciseAtributes.bodyParts = await BodyPart.find();
		ExerciseAtributes.exerciseMucles = await ExerciseMucle.find();
		ExerciseAtributes.exerciseDifficult = await ExerciseDifficult.find();
		ExerciseAtributes.exerciseEquipments = await ExerciseEquipment.find();

		res.json(ExerciseAtributes);

		res.json(ExerciseAtributes);
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log(error);
		res.json('ERORR');
	}
};

const createExerciseType = async (req, res) => {
	const exerciseType = new ExerciseType(req.body);
	await exerciseType.save();
	res.json(exerciseType);
};

const getAllExercisesTypes = async (req, res) => {
	try {
		const result = await ExerciseType.find(req.query);

		res.json(result);
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log(error);
		res.json('ERORR');
	}
};

const createExerciseEquipment = async (req, res) => {
	const exerciseEquipment = new ExerciseEquipment(req.body);
	await exerciseEquipment.save();
	res.json(exerciseEquipment);
};

const getAllExerciseEquipment = async (req, res) => {
	try {
		const result = await ExerciseEquipment.find(req.query);

		res.json(result);
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log(error);
		res.json('ERORR');
	}
};

const createBodyPart = async (req, res) => {
	const bodyPart = new BodyPart(req.body);
	await bodyPart.save();
	res.json(bodyPart);
};

const getAllBodyPart = async (req, res) => {
	try {
		console.log('----------', req.query);
		const result = await BodyPart.find(req.query);

		res.json(result);
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log(error);
		res.json('ERORR');
	}
};

const createExerciseDifficulty = async (req, res) => {
	const exerciseDifficult = new ExerciseDifficult(req.body);
	await exerciseDifficult.save();
	res.json(exerciseDifficult);
};

const getAllExerciseDifficulty = async (req, res) => {
	try {
		const result = await ExerciseDifficult.find(req.query);

		res.json(result);
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log(error);
		res.json('ERORR');
	}
};

const createExerciseMuscle = async (req, res) => {
	const exerciseMucle = new ExerciseMucle(req.body);
	await exerciseMucle.save();
	res.json(exerciseMucle);
};

const getAllExerciseMuscle = async (req, res) => {
	try {
		const result = await ExerciseMucle.find(req.query);

		res.json(result);
	} catch (error) {
		console.log('EEERROOOOOOOOOOOOO');
		console.log(error);
		res.json('ERORR');
	}
};

module.exports = {
	getAllExercises,
	createExercise,
	updateExercise,
	createExerciseType,
	getAllExercisesTypes,
	createExerciseEquipment,
	getAllExerciseEquipment,
	createBodyPart,
	getAllBodyPart,
	createExerciseDifficulty,
	getAllExerciseDifficulty,
	createExerciseMuscle,
	getAllExerciseMuscle,
	getExerciseAtributes,
	deleteExcercise,
};
