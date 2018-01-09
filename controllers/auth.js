var express = require('express');
var passport = require('../config/ppConfig.js')
var db = require('../models')
var router = express.Router();


router.get('/login', function(req, res){
  res.render('auth/login.ejs');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/portfolio',
  successFlash: 'Login Successful',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials'
}));

router.get('/signup', function(req, res){
  res.render('auth/signup.ejs');
});

router.post('/signup', function(req, res, next){
  db.user.findOrCreate({
    where: { email: req.body.email },
    //run when creating new user, didn't find existing
    defaults: {
      username: req.body.username,
      password: req.body.password
    }
  // promise like then, but tells if was found or created  
  }).spread(function(user, wasCreated){
    if(wasCreated){
      //good job, didn't try to make a duplicate
      passport.authenticate('local', {
        successRedirect: '/portfolio',
        successFlash: 'Successfully logged in!'
      })(req, res, next);
    }
    else {
      //bad job, you tried to make a duplicate
      req.flash('error', 'Email already exists');
      res.redirect('/auth/login');
    }
  }).catch(function(err){
    req.flash('error', err.message);
    res.redirect('/auth/signup');
  });
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Successfully logged out');
  res.redirect('/');
});

module.exports = router;