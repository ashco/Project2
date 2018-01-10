

// AJAX VARIABLES
var tmcNum;
var tickerData;
var tickerData_Price;
var tickerData_Change24h;





// MATERIALIZE STUFF
// Mobile hamburger menu
$('.button-collapse').sideNav();

// Datatable functionality via..
// https://datatables.net/examples/styling/material.html
$('#main-table').DataTable( {
  columnDefs: [
    {
      targets: [ 0, 1, 2 ],
      className: 'mdl-data-table__cell--non-numeric'
    }
  ]
});





// AJAX STUFF
// AJAX Total Market Cap
$.get('https://api.coinmarketcap.com/v1/global/')
.done(function(global){
  tmcNum = global.total_market_cap_usd.toString();
});

// Inserts total market cap gathered data into page
function tmcText(){
  $('#tmc-num').text(tmcNum);
}


// AJAX Coin List
$.get('https://api.coinmarketcap.com/v1/ticker/?limit=25')
.done(function(ticker) {
  tickerData = ticker;
});

function sortTicker(coin){
  return coin.name === "NEO"
}

// tickerData.find(sortTicker).price_usd;



// //function to add into to page
function tickerText(){
  $('.tester').html(tickerData.find(sortTicker).price_usd)
}





//add to watchlist click listener 
$('.watchlist-link').click(function(wc){
  wc.preventDefault()
  $.post($(this).attr('href'))
  // console.log($(this).attr('href'));
  // $.ajax({
  //   url: $(this).attr('href'),
  //   method: 'POST'
  // }).done(function(data){

  // });
});








//Runs on initialization
function init(){
  tmcText();
} 

init();