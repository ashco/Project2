var db = require('../models');

db.coin.create([{
    id: 1, 
    ticker: 'BTC',
    name: 'Bitcoin'
},{
    id: 2, 
    ticker: 'ETH',
    name: 'Etherium'
},{
    id: 3, 
    ticker: 'XRP',
    name: 'Ripple'
},{
    id: 4, 
    ticker: 'BCH',
    name: 'Bitcoin Cash'
},{
    id: 5, 
    ticker: 'ADA',
    name: 'Cardano'
},{
    id: 6, 
    ticker: 'XEM',
    name: 'NEM'
},{
    id: 7, 
    ticker: 'LTC',
    name: 'Litecoin'
},{
    id: 8, 
    ticker: 'XLM',
    name: 'Stellar'
},{
    id: 9, 
    ticker: 'MIOTA',
    name: 'IOTA'
},{
    id: 10, 
    ticker: 'DASH',
    name: 'Dash'
},{ 
    id: 11, 
    ticker: 'NEO',
    name: 'NEO'
},{
    id: 12, 
    ticker: 'ASH',
    name: 'Ashcoin'
}]).then(function(thing){
    console.log('done');
})