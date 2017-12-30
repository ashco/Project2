//Declare Modules
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();


//Middleware setup
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));


//Root directory
app.get('/', function(req, res){
  res.render('index.ejs');
});


//Declaring Routes
// app.use('/something', require('.routes/something.js'));

var server = app.listen(5000);

module.exports = server;