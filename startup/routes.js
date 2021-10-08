const express = require('express');
const indexRouter = require('../routes/index');
const loginRouter = require('../routes/auth');
const signupRouter = require('../routes/signup');

module.exports = function(app) {
    app.use(express.json());

    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);

}