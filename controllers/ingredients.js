const IngredientModel = require('../models/ingredient')

// GET INGREDIENTS
const getAllIngredients = async function (req, res, next) {
    const ingredient = await IngredientModel.find()
    res.json({ ingredient })
}



// GET PATIENT BY ID
const getIngredientById = async function (req, res, next) {
    const { id } = req.params
    const ingredient = await IngredientModel.findById(id)
    res.json({ ingredient })
}

// POST PATIENT

const IngredientSchema = require("../models/ingredient");
const createIngredient = async function (req, res, next) {

    const newIngredient = new IngredientSchema();
    newIngredient.nameIngredient = req.body.nameIngredient;
    newIngredient.grProtein = req.body.grProtein;
    newIngredient.grFats = req.body.grFats;
    newIngredient.grCarboHydrates = req.body.grCarboHydrates;
    newIngredient.Kcal = req.body.Kcal;
  
    newIngredient.save((err, saveInfo) => {
      if (err) return res.status(500).json({ error: err });
      return res.json({ ingredient: saveInfo });
    });
  };


// PUT PATIENT
const putIngredient = async function (req, res, next) {
    const ingredient = await IngredientModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!ingredient) return res.status(404).json({});
    
      res.send("Modificación finalizada");
    
}
// DELETE INGREDIENT

const deleteIngredient = async function (req, res, next) {
    try {
        await IngredientModel.findByIdAndDelete(req.params.id)
        res.json('Ingredient deleted!')
    } catch (err) {
        res.send(400).send('Server Error')
    }
}

module.exports = { getAllIngredients, getIngredientById, createIngredient, putIngredient, deleteIngredient }
