var express = require('express');
var isLoggedIn = require('../middleware/isLoggedIn.js');
var db = require('../models');
var router = express.Router();

///////
//Duplicate for now, will try to DRY up later..
var request = require('request');
var tickerURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=25';
var tickerData;

function getData(){
  request(tickerURL, function(error, response, body){
    tickerData = JSON.parse(body);
  });
}; 

getData()

///////


router.get('/', function(req, res){
// router.get('/', isLoggedIn, function(req, res){
  db.preference.findAll({
    //change to make match for when user id is for current user, not just user 1
    where: { userId: 1 },
    // where: { userId: req.user.id },
    include: [db.coin]
  }).then(function(watchlistData){
    // console.log(tickerData);
    res.render('watchlist.ejs', {
      watchlistData: watchlistData,
      tickerData: tickerData
    });
  });
});


router.post('/:coin', function(req, res){
  //finds selected :coin from coin table and links all preferences with it
  db.coin.find({
    where: { name: req.params.coin },
    include: [db.preference]
    // finds/creates when watchlist is 1 (aka true)
  }).then(function(data){
    db.preference.findOrCreate({
      where: { 
        //Need to add in more params to make it only skip duplicates, not just when there is 1 entry
        watchlist: '1',
      }
    //if new entry is needed, add it to Preferences table
    }).spread(function(newEntry, wasCreated){
      if(newEntry){
        data.addPreference(newEntry);
      }
    })
  //catch errors 
  }).catch(function(err){
    res.status(400).render('404.ejs');
  })
});


// post, 
//   find or create
//     WHERE - userId, coinId, and watchlist all match
//       either entry 
//         and do nothing
//       or no entry
//         create table entries
//           userId - logged in user
//           coinId - from posted :coin
//           watchlist - 1 
//           value - null




router.delete('/:coin', function(req, res){
  console.log('watchlist/:id DELETE works');
});

module.exports = router;