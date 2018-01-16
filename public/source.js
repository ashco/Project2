//length of MarketCap list
var mcListLength = 25;

// AJAX VARIABLES
// var tmcNum;

//raw data from API request
// var tickerData;
// var watchlistArray;
//function converts ticker data into relevant data for site
// var marketCapData = [
//   { name: 'Bitcoin', marketCap: '251386982363', price: '14968.2', volume: '18504700000.0', percent_change_24h: '3.35'},
//   { name: 'Ethereum', marketCap: '1000000000', price: '1300.2', volume: '185047000.0', percent_change_24h: '13.35'}
// ]



// MATERIALIZE STUFF
$('.button-collapse').sideNav();
// $('.modal').modal();
$('select').material_select();
// $(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  // $('.modal').modal();
// });

// Datatable functionality via..
// https://datatables.net/examples/styling/material.html
// $('#main-table').DataTable( {
//   columnDefs: [
//     {
//       targets: [ 0, 1, 2 ],
//       className: 'mdl-data-table__cell--non-numeric'
//     }
//   ]
// });


//not needed now, using ejs
// AJAX STUFF
// AJAX Total Market Cap
// $.get('https://api.coinmarketcap.com/v1/global/')
// .done(function(global){
//   tmcNum = global.total_market_cap_usd.toString();
// });

// Inserts total market cap gathered data into page
// function tmcText(){
//   $('#tmc-num').text(tmcNum);
// }


// // AJAX Coin List
// $.get('https://api.coinmarketcap.com/v1/ticker/?limit=25')
// .done(function(ticker) {
//   tickerData = ticker;
// });


// function watchlistText(){
//   for(var i = 0; i < watchlistTickers.length; i++){
//     $('#' + watchlistTickers[i] + '-price').html('$' + tickerData.find(function(coin){
//       return coin.symbol === watchlistTickers[i];
//     }).price_usd);
//     $('#' + watchlistTickers[i] + '-24h-change').html(tickerData.find(function(coin){
//       return coin.symbol === watchlistTickers[i];
//     }).percent_change_24h + '%');
//   }
// }


//add to watchlist click listener 
$('.watchlist-add').click(function(wlAdd){
  wlAdd.preventDefault()
  $.post($(this).attr('href'))
});

$('.watchlist-remove').click(function(wlRemove){
  $.ajax({
    url: $(this).attr('href'),
    method: 'DELETE'
  }).done(function(data){
    location.reload();
  });
});

setTimeout(function(){
  $('.alert').addClass('animated fadeOut')
}, 3000);
