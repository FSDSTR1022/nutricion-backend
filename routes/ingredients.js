/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const IngredientSchema = require("../models/ingredient");

router.get("/", async function (req, res, next) {
  const ingredients = await IngredientSchema.find();
  res.json({ ingredients });
});

router.get("/:_id", async function (req, res, next) {
  const ingredient = await IngredientSchema.findById(req.params._id);
  res.json({ item: ingredient });
});

router.post("/", async function (req, res, next) {
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
});

router.put("/:_id", async function (req, res, next) {
  console.log("entramos en put");
  const ingredient = await IngredientSchema.findByIdAndUpdate(
    req.params._id,
    req.body
  );
  if (!ingredient) return res.status(404).json({});

  res.send("Modificación finalizada");
});

router.delete("/:_id", async function (req, res, next) {
  await IngredientSchema.findByIdAndDelete(
    req.params._id,
    function (err, docs) {
      if (err) {
        console.log(err);
        res.json({ err });
      } else {
        res.json({ deleted: docs });
        console.log("Deleted : ", docs);
      }
    }
  );
});
module.exports = router;
