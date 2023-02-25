const exerciseModel = require("../models/exercise/exerciseModel")
const exerciseType = require("../models/exercise/exerciseTypeModel");
const exerciseEquipment = require("../models/exercise/exerciseEquipmentModel");
const BodyPart = require("../models/exercise/exerciseBodyPartModel");
const exerciseDifficult = require("../models/exercise/exerciseDifficultyModel");
const exerciseMucle = require("../models/exercise/exerciseMusclesModel");

const getAllExercises = async (req, res) => {
  try {
    const result = await exerciseModel.find(req.query)
      .populate("exerciseType")
      .populate("equipments")
      .populate("bodyParts")
      .populate("difficulty")
      .populate("muscles");
      
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("ERORR: "+error);
  }
};

const createExercise = async (req, res) => {
  try {
    const newexercise = new exerciseModel(req.body);
    const save= await newexercise.save();
    res.status(200).json(save);
    
  } catch (error) {
    res.status(400).json("ERORR: "+error)
  }
  
};

const updateExercise = async (req, res) => {
   console.log("PARAMS: ",req.params);
                                       //{}
    console.log("BODY: ",req.body);
                                      /* {
                                        name: 'Ejercicio Modificado',
                                        bodyPart: [ { _id: '63c5d88935c2960ff95f6854' } ]
                                      } */    
    console.log("Query: ",req.query);
                                      //->  { id: '63d7d0f4f5dca7a34c4c8bf0' }
    console.log("ID: ",req.query.id);
                                      // -> 63d7d0f4f5dca7a34c4c8bf0
    
    try {
     await exerciseModel.findByIdAndUpdate(req.query.id, req.body);
     
     const exercise = await exerciseModel.findById(req.query.id);

     res.status(200).json(exercise);
      
    } catch (error) {
      res.json("ERORR: "+error);
    }

  
};

const deleteExercise = async (req,res) =>{

  try {
      
    let respuesta = await exerciseModel.findByIdAndDelete(req.query._id)

    if(!respuesta)
    {
            res.status(404).json('No hay Ejercicio con ese ID')
    }
    else{
      res.status(200).json(respuesta)
    }    
   
  } catch (error) {
    res.status(400).json("ERORR: "+error);
  }

}

///////////////////////////////////////////////////////////////////////////////////////////////

const getExerciseAtributes = async (req,res) =>{
  
  try {
   
    let exerciseAtributes={};

    exerciseAtributes.exerciseType = await exerciseType.find();
    exerciseAtributes.bodyParts = await BodyPart.find();
    exerciseAtributes.exerciseMucles = await exerciseMucle.find();
    exerciseAtributes.exerciseDifficult = await exerciseDifficult.find();
    exerciseAtributes.exerciseEquipments = await exerciseEquipment.find();
    
    res.json(exerciseAtributes);

    
  } catch (error) {
    res.json("ERORR: "+error);
  }


}

///////////////////////////////////////////////////////////////////////////////////////////////

const createExerciseType = async (req, res) => {
  const exerciseType = new exerciseType(req.body);
  await exerciseType.save();
  res.json(exerciseType);
};

const getAllexercisesTypes = async (req, res) => {
  try {

    const result = await exerciseType.find(req.query);

    res.json(result);

  } catch (error) {
    res.json("ERORR: "+error);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////

const createExerciseEquipment = async (req, res) => {
  const exerciseEquipment = new exerciseEquipment(req.body);
  await exerciseEquipment.save();
  res.json(exerciseEquipment);
};

///////////////////////////////////////////////////////////////////////////////////////////////
const getAllExerciseEquipment = async (req, res) => {
  try {
    const result = await exerciseEquipment.find(req.query);

    res.json(result);
  } catch (error) {
    res.json("ERORR: "+error);
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
    res.json("ERORR: "+error);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////

const createExerciseDifficulty = async (req, res) => {
  const exerciseDifficult = new exerciseDifficult(req.body);
  await exerciseDifficult.save();
  res.json(exerciseDifficult);
};

const getAllExerciseDifficulty = async (req, res) => {
  try {
    const result = await exerciseDifficult.find(req.query);

    res.json(result);
  } catch (error) {
    res.json("ERORR: "+error);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////

const createExerciseMuscle = async (req, res) => {
  const exerciseMucle = new exerciseMucle(req.body);
  await exerciseMucle.save();
  res.json(exerciseMucle);
};

const getAllExerciseMuscle = async (req, res) => {
  try {
    const result = await exerciseMucle.find(req.query);

    res.json(result);
  } catch (error) {
    res.json("ERORR: "+error);
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
  deleteExercise

};
