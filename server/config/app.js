let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

let mongoose = require('mongoose');
let DB = require('./db');
//mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.connect(DB.URI);
let mongodDB = mongoose.connection;
mongodDB.on("error", console.error.bind(console, "Connection Error"));
mongodDB.once("open", ()=>{console.log("MongoDB Connected")});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let appsRouter = require('../routes/apps');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/applist', appsRouter);

  // Creates a SMTP transporter object
  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renders the error page
  res.status(err.status || 500);
  res.render('error', 
  {
    title: "Error"
  }
  );
});
  
module.exports = app;

