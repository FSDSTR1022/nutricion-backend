const Exercise = require("../models/exerciseModel");
const ExerciseType = require("../models/excerciseTypeModel");
const ExerciseEquipment = require("../models/excerciseEquipmentModel");
const BodyPart = require("../models/excerciseBodyPartModel");
const ExerciseDifficult = require("../models/excerciseDifficultyModel");
const ExerciseMucle = require("../models/excerciseMusclesModel");

const getAllExercises = async (req, res) => {
  try {
    const result = await Exercise.find(req.query)
      .populate("exerciseType")
      .populate("equipment")
      .populate("bodyPart")
      .populate("difficulty")
      .populate("muscles");
      
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

const getExerciseAtributes = async (req,res) =>{
  
  try {
   
    let ExerciseAtributes={};

    ExerciseAtributes.tipoEjercicio = await ExerciseType.find();
    ExerciseAtributes.parteDelCuerpo = await BodyPart.find();
    ExerciseAtributes.musculos = await ExerciseMucle.find();
    ExerciseAtributes.dificultad = await ExerciseDifficult.find();
    ExerciseAtributes.equipamiento = await ExerciseEquipment.find();
    
    res.json(ExerciseAtributes);

    
  } catch (error) {
    console.log("EEERROOOOOOOOOOOOO");
    console.log(error);
    res.json("ERORR");
  }


}

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

///////////////////////////////////////////////////////////////////////////////////////////////

const createBodyPart = async (req, res) => {
  const bodyPart = new BodyPart(req.body);
  await bodyPart.save();
  res.json(bodyPart);
};

const getAllBodyPart = async (req, res) => {
  try {
    console.log("----------",req.query)
    const result = await BodyPart.find(req.query);

    res.json(result);
  } catch (error) {
    console.log("EEERROOOOOOOOOOOOO");
    console.log(error);
    res.json("ERORR");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////

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
    console.log("EEERROOOOOOOOOOOOO");
    console.log(error);
    res.json("ERORR");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////

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
    console.log("EEERROOOOOOOOOOOOO");
    console.log(error);
    res.json("ERORR");
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
  getExerciseAtributes

};
