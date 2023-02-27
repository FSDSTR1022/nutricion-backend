require('dotenv').config();
const express = require('express');
const router = express.Router();
const cors = require('cors');

const usersRoutes = require('./usersRouter');
const rutineRoutes = require('./rutineRouter');
const exerciseRoutes = require('./exerciseRouter');

router
	.use('/users', usersRoutes)
	.use('/exercises', exerciseRoutes)
	.use('/rutines', rutineRoutes)
	.use(cors());

module.exports = router;
