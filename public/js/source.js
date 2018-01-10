// Variables
var tmcNum;

//Coin data source object
var tickerData;


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





// // AJAX total marketcap request
// $.get('https://api.coinmarketcap.com/v1/global/')
// .done(function(global) {
//   tmcNum = global.total_market_cap_usd.toString();
// });

// // AJAX coin stats request
// $.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
// .done(function(ticker) {
//   tickerData = ticker;
// });

// Inserts AJAX gathered data into page
function tmcText(){
  $('#tmc-num').text(tmcNum);
}

function tickerText(){
  $('#pos-4').html('<td>Bitcoin Cash</td><td>$41,500,019,205</td><td>$2,457.24</td><td>$1,078,290,000</td><td>-2.08%</td>')
}





//add to watchlist click listener 
$('.watch-coin').click(function(wc){
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

// init();