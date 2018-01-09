//Declare Modules
require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn.js');
var passport = require('./config/ppConfig.js');
var session = require('express-session');
var app = express();


//Middleware setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});



//Root directory
app.get('/', function(req, res){
  // console.log('hello');
  // res.render('index.ejs');
  var tickerURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
  request(tickerURL, function(error, response, body){
    // res.send(body);
    var tickerInfo = JSON.parse(body).results;
    res.render('index.ejs', {coins : tickerInfo});
    console.log(tickerInfo);
  });
});

app.get('/marketcap', function(req, res){
  res.redirect('/');
});


//Declaring Routes
app.use('/auth', require('./controllers/auth.js'));
app.use('/watchlist', require('./controllers/watchlist.js'));
app.use('/portfolio', require('./controllers/portfolio.js'));
// app.use('/wallets', require('./controllers/wallets.js'));


var server = app.listen(5000);

module.exports = server;