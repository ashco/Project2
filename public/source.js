// MATERIALIZE STUFF
$('.button-collapse').sideNav();
$('select').material_select();
// $('.modal').modal();

//WATCHLIST CLICK LISTENERS
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

//ALERT FADEOUTS
setTimeout(function(){
  $('.alert').addClass('animated fadeOut')
}, 3000);
