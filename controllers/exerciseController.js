const exerciseModel = require('../models/exercise/exerciseModel');
const exerciseTypeModel = require('../models/exercise/exerciseTypeModel');
const exerciseEquipmentModel = require('../models/exercise/exerciseEquipmentModel');
const BodyPartModel = require('../models/exercise/exerciseBodyPartModel');
const exerciseDifficultModel = require('../models/exercise/exerciseDifficultyModel');
const exerciseMucleModel = require('../models/exercise/exerciseMusclesModel');

const getAllExercises = async (req, res) => {
	try {
		const result = await exerciseModel
			.find(req.query)
			.populate('exerciseType')
			.populate('equipments')
			.populate('bodyParts')
			.populate('difficulty')
			.populate('muscles');

		res.status(200).json(result);
	} catch (error) {
		res.status(400).json('ERORR: ' + error);
	}
};

const createExercise = async (req, res) => {
	try {
		const newexercise = new exerciseModel(req.body);
		const save = await newexercise.save();
		res.status(200).json(save);
	} catch (error) {
		res.status(400).json('ERORR: ' + error);
	}
};

const updateExercise = async (req, res) => {
	
	console.log("en updateExercise")
	console.log("en req.query.id")
	console.log("en req.body")
	try {
		await exerciseModel.findByIdAndUpdate(req.query.id, req.body);

		const exercise = await exerciseModel.findById(req.query.id);

		res.status(200).json(exercise);
	} catch (error) {
		res.json('ERORR: ' + error);
	}
};

const deleteExercise = async (req, res) => {
	try {
		let respuesta = await exerciseModel.findByIdAndDelete(req.query._id);
		console.log("respuesta: ",respuesta)

		if (!respuesta) {
			res.status(400).json('No hay Ejercicio con ese ID');
		} else {
			res.status(200).json(respuesta);
		}
	} catch (error) {
		res.status(400).json('ERORR: ' + error);
	}
};

const getExerciseAtributes = async (req, res) => {
	try {
		let exerciseAtributes = {};

		exerciseAtributes.exerciseType = await exerciseTypeModel.find();
		exerciseAtributes.bodyParts = await BodyPartModel.find();
		exerciseAtributes.exerciseMucles = await exerciseMucleModel.find();
		exerciseAtributes.exerciseDifficult = await exerciseDifficultModel.find();
		exerciseAtributes.exerciseEquipments = await exerciseEquipmentModel.find();

		res.json(exerciseAtributes);
	} catch (error) {
		res.json('ERORR: ' + error);
	}
};

const createExerciseType = async (req, res) => {
	const exerciseType = new exerciseTypeModel(req.body);
	await exerciseType.save();
	res.json(exerciseType);
};

const getAllexercisesTypes = async (req, res) => {
	try {
		const result = await exerciseTypeModel.find(req.query);

		res.json(result);
	} catch (error) {
		res.json('ERORR: ' + error);
	}
};

const createExerciseEquipment = async (req, res) => {
	const exerciseEquipment = new exerciseEquipmentModel(req.body);
	await exerciseEquipment.save();
	res.json(exerciseEquipment);
};

const getAllExerciseEquipment = async (req, res) => {
	try {
		const result = await exerciseEquipmentModel.find(req.query);

		res.json(result);
	} catch (error) {
		res.json('ERORR: ' + error);
	}
};

const createBodyPart = async (req, res) => {
	const bodyPart = new BodyPartModel(req.body);
	await bodyPart.save();
	res.json(bodyPart);
};

const getAllBodyPart = async (req, res) => {
	try {
		const result = await BodyPartModel.find(req.query);

		res.json(result);
	} catch (error) {
		res.json('ERORR: ' + error);
	}
};

const createExerciseDifficulty = async (req, res) => {
	const exerciseDifficult = new exerciseDifficultModel(req.body);
	await exerciseDifficult.save();
	res.json(exerciseDifficult);
};

const getAllExerciseDifficulty = async (req, res) => {
	try {
		const result = await exerciseDifficultModel.find(req.query);

		res.json(result);
	} catch (error) {
		res.json('ERORR: ' + error);
	}
};

const createExerciseMuscle = async (req, res) => {
	const exerciseMucle = new exerciseMucleModel(req.body);
	await exerciseMucle.save();
	res.json(exerciseMucle);
};

const getAllExerciseMuscle = async (req, res) => {
	try {
		const result = await exerciseMucleModel.find(req.query);

		res.json(result);
	} catch (error) {
		res.json('ERORR: ' + error);
	}
};

module.exports = {
	getAllExercises,
	createExercise,
	updateExercise,
	createExerciseType,
	getAllexercisesTypes,
	createExerciseEquipment,
	getAllExerciseEquipment,
	createBodyPart,
	getAllBodyPart,
	createExerciseDifficulty,
	getAllExerciseDifficulty,
	createExerciseMuscle,
	getAllExerciseMuscle,
	getExerciseAtributes,
	deleteExercise,
};
