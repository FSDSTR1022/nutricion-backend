/* eslint-disable no-unused-vars */
const IngredientModel = require("../models/ingredient");

// GET Ingredients
const getAllIngredients = async function (req, res) {
  const ingredients = await IngredientModel.find();
  res.json({ ingredients });
};

/* GET PATIENT BY ID
const getPatientById = async function (req, res, next) {
  const { id } = req.params;
  const patient = await PatientModel.findById(id);
  res.json({ patient });
};

// POST PATIENT
const createPatient = async function (req, res, next) {
  const newPatient = new PatientModel();

  newPatient.dni = req.body.dni;
  newPatient.name = req.body.name;
  newPatient.discipline = req.body.discipline;
  newPatient.admissionDate = req.body.admissionDate;
  newPatient.dropoutDate = req.body.dropoutDate;
  newPatient.email = req.body.email;
  newPatient.phone = req.body.phone;
  newPatient.user = req.body.user;
  newPatient.password = req.body.password;
  newPatient.active = req.body.active;
  newPatient.imgUrl = req.body.imgUrl;

  newPatient.save((err, savedInfo) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.json({ patient: savedInfo });
  });
};

// PUT PATIENT
const putPatient = async function (req, res, next) {
  try {
    await PatientModel.findByIdAndUpdate(req.params.id, {
      dni: req.body.dni,
      name: req.body.name,
      discipline: req.body.discipline,
      admissionDate: req.body.admissionDate,
      dropoutDate: req.body.dropoutDate,
      email: req.body.email,
      phone: req.body.phone,
      user: req.body.user,
      password: req.body.password,
      active: req.body.active,
      imgUrl: req.body.imgUrl,
    });
    res.send("Patient Updated!");
  } catch (err) {
    res.send(400).send("Server Error");
  }
};

// DELETE PATIENT
const deletePatient = async function (req, res, next) {
  try {
    await PatientModel.findByIdAndDelete(req.params.id);
    res.json("Patient deleted!");
  } catch (err) {
    res.send(400).send("Server Error");
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  putPatient,
  deletePatient,
};*/
