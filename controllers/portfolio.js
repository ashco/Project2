var express = require('express');
var isLoggedIn = require('../middleware/isLoggedIn.js');
var db = require('../models');
var router = express.Router();


//Duplicate for now, will try to DRY up later..
var request = require('request');
var tickerURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=25';
var tickerData;

function getData(){
  request(tickerURL, function(error, response, body){
    tickerData = JSON.parse(body);
    console.log('API data got!');
  });
}; 

getData()

router.get('/', isLoggedIn, function(req, res){
// router.get('/', isLoggedIn, function(req, res){
  db.preference.findAll({
    where: { 
      userId: req.user.id,
      // Need to only find table entries with value
      // value: 1
    },
    include: [db.coin]
  }).then(function(portfolioData){
    res.render('portfolio.ejs', {
      portfolioData: portfolioData,
      tickerData: tickerData
    });
  });
});

// Route that form will post to
router.post('/', function(req, res){
  console.log('/portfolio POST working', req.params);
});

//Deletes selected id from database
router.delete('/:coin', function(req, res){
  console.log('/portfolio DELETE working');
});

module.exports = router;