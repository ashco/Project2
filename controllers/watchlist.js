var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('watchlist.ejs');
});

router.post('/:id', function(req, res){
  console.log('watchlist/:id POST works');
});

router.delete('/:id', function(req, res){
  console.log('watchlist/:id DELETE works');
});

module.exports = router;