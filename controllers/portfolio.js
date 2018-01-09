var express = require('express');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res){
  res.render('portfolio.ejs');
});

// Route that form will post to
router.post('/', function(req, res){
  console.log('/portfolio POST working');
});

//Deletes selected id from database
router.delete('/:id', function(req, res){
  console.log('/portfolio DELETE working');
});

module.exports = router;