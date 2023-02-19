const express = require('express');
const router = express.Router();
const rutineController = require ("../controllers/rutineController");

router.get("/",rutineController.getAllRutines);
router.delete("/",rutineController.deleteRutine)
router.post("/",rutineController.createRutine)
router.put("/",rutineController.updateRutine);

module.exports = router;

