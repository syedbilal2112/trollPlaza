const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const app = express();

const db = require('./app/models/db');
db.dbInit();

// Setting cors
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true,
  parameterLimit: 500000
}));
app.use(compression());
app.use(helmet());
app.get('/', function (req, res) {
  res.render('pages/auth');
});

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use('/auth', require('./app/controller/authController'));
app.use('/trollPlaza', require('./app/controller/trollPlazaApiController'));

module.exports = app;