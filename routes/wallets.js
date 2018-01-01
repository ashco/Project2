var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('wallets.ejs');
});

module.exports = router;