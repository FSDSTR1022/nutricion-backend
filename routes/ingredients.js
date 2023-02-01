const express = require("express");
const router = express.Router();
const userController = require('../controllers/ingredients')


// GET INGREDIENTS
router.get('/', userController.getAllIngredients)

// GET INGREDIENT BY ID

router.get('/:id', userController.getIngredientById)

//  POST INGREDIENT

router.post('/', userController.createIngredient)

// PUT INGREDIENT

router.put('/:id', userController.putIngredient)

// DELETE INGREDIENT

router.delete('/:id', userController.deleteIngredient)


module.exports = router;
