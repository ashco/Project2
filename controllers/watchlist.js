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


//Root directory
// app.get("/", function(req, res) {
//   db.coin.findAll({
//     // order: sequelize.col(ticker)
//   })
//   .then(function(coinData){
//     res.render("marketcap.ejs", {
//       tickerData: tickerData,
//       tmcData: tmcData,
//       coinData: coinData
//     });
//   });
// });


router.get('/', isLoggedIn, function(req, res){
  db.preference.findAll({
    where: { 
      userId: req.user.id,
      watchlist: 1
    },
    include: [db.coin]
  }).then(function(watchlistData){
    res.render('watchlist.ejs', {
      watchlistData: watchlistData,
      tickerData: tickerData
    });
  });
});


router.post('/:coin', function(req, res){
  db.coin.findOne({
    where: { ticker: req.params.coin },
    include: [db.preference]
  }).then(function(data){
    console.log('THIS IS DATA: ', data.id);
    db.preference.findOrCreate({
      // find preference table row where...
      where: { 
        // userId is equal to current logged in user
        userId: req.user.id,
        // AND coinId column is 
        coinId: data.id,
        // AND item is on watchlist
        watchlist: 1
      },
      //Didn't find? Create this
      include: [db.coin],
      defaults: {
        userId: req.user.id,
        coinId: data.id,
        watchlist: 1
      }
    //if new entry is needed, add it to Preferences table
    }).spread(function(newEntry, wasCreated){
      // console.log('###########', newEntry, ' ############## ', wasCreated, "########################");
      if(wasCreated){
        data.addPreference(newEntry);
      }
    })
  //catch errors 
  }).catch(function(err){
    res.status(400).render('404.ejs');
  })
});

router.delete('/:coin', function(req, res){
  db.coin.findOne({
    where: { ticker: req.params.coin },
    include: [db.preference]
  }).then(function(data){
    // console.log('THIS IS DATA', data.id);
    db.preference.update({
      watchlist: 0 
    }, {
      where: { 
        userId: req.user.id,
        coinId: data.id
      }
    })
    res.send('success')
  }).catch(function(err){
    console.log('An error has occurred', err);
    res.send('fail');
  });
});

module.exports = router;