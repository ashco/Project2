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
var tickerURL = "https://api.coinmarketcap.com/v1/ticker/?limit=100";
var tmcURL = "https://api.coinmarketcap.com/v1/global/";

//API DATA
var tickerData;
var globalData;

//DATA POLL
function getData() {
  request(tickerURL, function(error, response, body) {
    tickerData = JSON.parse(body);
    for(var i = 0; i < tickerData.length; i++){
      tickerData[i].market_cap_usd = (numeral(tickerData[i].market_cap_usd).format('$0,0'));
      tickerData[i].price_usd = (numeral(tickerData[i].price_usd).format('$0,0.00'));
      tickerData[i]['24h_volume_usd'] = (numeral(tickerData[i]['24h_volume_usd']).format('$0,0'));
      tickerData[i].percent_change_24h = (numeral(tickerData[i].percent_change_24h/100).format('0.00%'));
    }
  });
  request(tmcURL, function(error, response, body) {
    globalData = JSON.parse(body);
    globalData.total_market_cap_usd = numeral(globalData.total_market_cap_usd).format('$0,0');
  });
  console.log('Data got\'d');
}

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
    globalData: globalData
  });
});

app.get("/marketcap", function(req, res) {
  res.redirect("/");
});

//ROUTES
app.use("/auth", require("./controllers/auth.js"));
app.use("/watchlist", require("./controllers/watchlist.js"));
// app.use("/portfolio", require("./controllers/portfolio.js"));

//PULL API DATA
getData();

//API DATA REFRESH
setInterval(function(){
  getData()
  console.log('Fresh data!')
}, 60000);

var server = app.listen(process.env.PORT || 3000);

module.exports = server;