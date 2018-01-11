var request = require('request');

module.exports = function(req, res, next){
  var tickerURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=25';
  request(tickerURL, function(error, response, body){
    req.ticketData = JSON.parse(body);
  });
  return next();
}