//Declare Modules
require("dotenv").config();
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var flash = require("connect-flash");
var isLoggedIn = require("./middleware/isLoggedIn.js");
var pagePop = require("./middleware/pagePopulator.js");
var passport = require("./config/ppConfig.js");
var session = require("express-session");
var numeral = require('numeral');
var app = express();

//API URLs
var tickerURL = "https://api.coinmarketcap.com/v1/ticker/?limit=25";
var tmcURL = "https://api.coinmarketcap.com/v1/global/";

//API data
var tickerData;





// market_cap_usd
// price_usd
// 24h_volume_usd
// percent_change_24h


var globalData;
var tmcUSD;

function getData() {
  request(tickerURL, function(error, response, body) {
    tickerData = JSON.parse(body);
    
  });
  request(tmcURL, function(error, response, body) {
    globalData = JSON.parse(body);
    tmcUSD = numeral(globalData.total_market_cap_usd).format('$0,0');
  });
  console.log("API data got!");
  console.log('Ticker Data is: ', tickerData);
  
}

getData();

//MIDDLEWARE
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

//Root directory
app.get("/", function(req, res) {
  res.render("marketcap.ejs", {
    tickerData: tickerData,
    tmcUSD: tmcUSD
  });
});

app.get("/marketcap", function(req, res) {
  res.redirect("/");
});

//Declaring Routes
app.use("/auth", require("./controllers/auth.js"));
app.use("/watchlist", require("./controllers/watchlist.js"));
// app.use("/portfolio", require("./controllers/portfolio.js"));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;