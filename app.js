const createError = require('http-errors');
const express = require('express');
const session = require("express-session");
const app = express();
const config = require('config');
const appkey=config.get('appPrivateKey'); 

app.use(session({
  secret: appkey,
  resave: false,
  saveUninitialized: true
}));

require('./startup/config')(app);
require('./startup/db')();
require('./startup/routes')(app);

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;