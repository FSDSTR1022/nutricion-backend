const express = require('express');
const router = express.Router();
const exerciseRoutes = require('./exerciseRouter');

const patientRoutes = require('./patients')
const professionalRoutes = require('./professionals')
const disciplineRoutes = require('./disciplines')

router
  .use("/patients", patientRoutes)
  .use("/professionals", professionalRoutes)
  .use("/disciplines", disciplineRoutes)
  .use("/Ejercicios",exerciseRoutes)

module.exports = router
