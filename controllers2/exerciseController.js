const Exercise = require("../models/exerciseModel");
const ExerciseType = require("../models/excerciseTypeModel");
const ExerciseEquipment = require("../models/excerciseEquipmentModel");

const getAllExercises = async (req, res) => {
  try {
    const result = await Exercise.find(req.query)
      .populate("exerciseType")
      .populate("equipment");

    res.json(result);
  } catch (error) {
    console.log("EEERROOOOOOOOOOOOO");
    console.log(error);
    res.json("ERORR");
  }
};

const updateExercise = async (req, res) => {
  /* console.log("PARAMS: ",req.params);
    console.log("BODY: ",req.body);
    console.log("Query: ",req.query);
    console.log("ID: ",req.query.id); */

  await Exercise.findByIdAndUpdate(req.query.id, req.body);
  const exercise = await Exercise.findById(req.query.id);
  res.json(exercise);
};

const createExercise = async (req, res) => {
  const newExercise = new Exercise(req.body);
  await newExercise.save();
  res.json(newExercise);
};

///////////////////////////////////////////////////////////////////////////////////////////////

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
    console.log("EEERROOOOOOOOOOOOO");
    console.log(error);
    res.json("ERORR");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////

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
    console.log("EEERROOOOOOOOOOOOO");
    console.log(error);
    res.json("ERORR");
  }
};

ExerciseEquipment;

module.exports = {
  getAllExercises,
  createExercise,
  updateExercise,
  createExerciseType,
  getAllExercisesTypes,
  createExerciseEquipment,
  getAllExerciseEquipment,
};
