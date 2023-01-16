const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://nutricion:4bDwjEOHoGDexz4X@nutricion.cclxebv.mongodb.net/nutricionRojo?retryWrites=true&w=majority";
const routes = require("./routes/index");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const routes = require("./routes/index");

var app = express();

//mongoose.connect(mongoUrl);
mongoose
  .connect(mongoUrl) // (mongoUrl, {useNewUrlParser: true, useUnifieldTopology: true})
  .then((x) => {
    console.log("Conexion bbdd correcto", x.connections[0].name);
  })
  .catch((err) => {
    console.log("Conexion bbdd error", err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
