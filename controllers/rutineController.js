const RutineModel = require("../models/rutineModel");

const getAllRutines = async (req, res) => {
  try {
    const result = await RutineModel.find()
      .populate("patient")
      .populate("rounds.excercises.exercise")
          
    res.status(200).json(result);

  } catch (error) {
    res.json("ERROR"+error);
  }
};

const createRutine = async (req, res) => {
  const newRutine = new RutineModel(req.body);
  try {
    const save= await newRutine.save();
    res.status(200).json(save);
    
  } catch (error) {
    res.json("ERROR"+error);
  }
 
};

const updateRutine = async (req, res) => {
    try {
      console.log(req.query.id);
      let result = await RutineModel.findByIdAndUpdate(req.query.id,req.body);
      if (!result) {
        res.status(404).json("No hay rutina con ese ID");
      } else {
        const rutine = await RutineModel.findById(req.query.id);
        res.status(200).json(rutine);
      }
    } catch (error) {
      res.json("ERROR" + error);
    }
}

const deleteRutine = async (req,res) =>{
    try {
      let result = await RutineModel.findByIdAndDelete(req.query.id);

      if (!result) {
        res.status(404).json("No hay rutina con ese ID");
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.json("ERROR" + error);
    }
}

module.exports = {
    getAllRutines,
    createRutine,
    updateRutine,
    deleteRutine
};
