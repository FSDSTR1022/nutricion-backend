/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/index');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoUrl = process.env.MONGO_URL;

const config = {
	application: {
		cors: {
			server: [
				{
					origin: process.env.PORT || `0.0.0.0:$PORT`,
					credentials: true,
				},
			],
		},
	},
};

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

//mongoose.connect(mongoUrl);
mongoose.set('strictQuery', false);
mongoose
	.connect(mongoUrl) // (mongoUrl, {useNewUrlParser: true, useUnifieldTopology: true})
	.then(x => {
		console.log('Conexion bbdd correcto', x.connections[0].name);
	})
	.catch(err => {
		console.log('Conexion bbdd error', err);
	});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(config.application.cors.server));

app.options('*', cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	next();
});

app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// app.listen(process.env.PORT || `0.0.0.0:$PORT`);

module.exports = app;
