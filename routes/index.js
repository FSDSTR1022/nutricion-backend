const express = require("express");
const router = express.Router();
const exerciseRoutes = require("./exerciseRouter");

const patientRoutes = require("./patients");
const professionalRoutes = require("./professionals");
const disciplineRoutes = require("./disciplines");
const ingredientRoutes = require("./ingredients");
const rutineRoutes = require("./rutineRouter");


router
  .use("/patients", patientRoutes)
  .use("/professionals", professionalRoutes)
  .use("/disciplines", disciplineRoutes)
  .use("/Ejercicios", exerciseRoutes)
  .use("/ingredients", ingredientRoutes)
  .use("/Rutinas",rutineRoutes);

module.exports = router;
