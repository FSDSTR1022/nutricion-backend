const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUsersByProfessional);
router.post('/', userController.createUser);
router.get('/user/:id', userController.getUserbyID);
router.put('/:id', userController.updateUser);


router.post('/login', userController.loginUser);

module.exports = router;
