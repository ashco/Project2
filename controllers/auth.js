var express = require('express');
var passport = require('../config/ppConfig.js')
var db = require('../models')
var router = express.Router();

//MIDDLEWARE
router.use(express.static(__dirname + '/../public'));

//LOGIN
router.get('/login', function(req, res){
  res.render('auth/login.ejs');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/watchlist',
  successFlash: 'Login Success!',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials'
}));

//SIGNUP
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
        successRedirect: '/watchlist',
        successFlash: 'Logged in!'
      })(req, res, next);
    }
    else {
      //bad job, you tried to make a duplicate
      req.flash('error', 'Email already exists');
      res.redirect('auth/login.ejs');
    }
  }).catch(function(err){
    req.flash('error', err.message);
    res.redirect('auth/signup.ejs');
  });
});

//LOGOUT
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/');
});

module.exports = router;