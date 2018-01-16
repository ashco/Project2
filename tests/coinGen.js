//DATA PULL FOR COINS DATABASE
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
        // console.log('NAME %%%%%%%%%%%%%%%', coinTableName);
        // console.log('SYMBOL%%%%%%%%%%%%', coinTableSymbol);
    }, 5000)
}

init();