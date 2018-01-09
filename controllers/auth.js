var express = require('express');
var passport = require('../config/ppConfig.js')
var db = require('../models')
var router = express.Router();


router.get('/login', function(req, res){
  res.render('auth/login.ejs');
});

router.get('/signup', function(req, res){
  res.render('auth/signup.ejs');
});

module.exports = router;