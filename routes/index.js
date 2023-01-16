const express = require('express');
const router = express.Router();

const patientRoutes = require('./patients')
const professionalRoutes = require('./professionals')
const disciplineRoutes = require('./disciplines')

router
  .use("/patients", patientRoutes)
  .use("/professionals", professionalRoutes)
  .use("/disciplines", disciplineRoutes)

module.exports = router
