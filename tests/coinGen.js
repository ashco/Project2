// var db = require('../models');

// db.coin.create([
//   {id: 1, 
//     name: 'BTC'},
//   {id: 2, 
//     name: 'ETH'},
//   {id: 3, 
//     name: 'XRP'},
//   {id: 4, 
//     name: 'BCH'},
//   {id: 5, 
//     name: 'ADA'},
//   {id: 6, 
//     name: 'XEM'},
//   {id: 7, 
//     name: 'LTC'},
//   {id: 8, 
//     name: 'XLM'},
//   {id: 9, 
//     name: 'MIOTA'},
//   {id: 10, 
//     name: 'DASH'}        
// ]).then(function(thing){})

var request = require("request");

var pullSize = 500;
var dbPullURL = "https://api.coinmarketcap.com/v1/ticker/?limit=" + pullSize;

var coinTableData;
var coinTableName = [];
var coinTableSymbol = [];


function getData() {
    request(dbPullURL, function(error, response, body) {
        coinTableData = JSON.parse(body);
        for(var i = 0; i < pullSize; i++){
            coinTableName.push(coinTableData[i].name);
            coinTableSymbol.push(coinTableData[i].symbol); 
        }
    });
};

function init(){
    getData();
    setTimeout(function(){
        console.log('NAME %%%%%%%%%%%%%%%', coinTableName);
        console.log('SYMBOL%%%%%%%%%%%%', coinTableSymbol);
        // console.log(coinData.symbol)
    }, 5000)
}

init();