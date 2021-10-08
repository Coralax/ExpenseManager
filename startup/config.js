const config = require('config');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cons = require('consolidate');
const appkey=config.get('appPrivateKey');

module.exports = function(app) {
    if (!appkey) {
      console.error('ERROR: appPrivateKey is not defined!');
      process.exit(1);
    }
    else
    {  
        app.engine('html', cons.swig);
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'html')
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, '../public')));

    }
  }

