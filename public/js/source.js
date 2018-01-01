$( document ).ready(function(){
  // Mobile hamburger menu
  $(".button-collapse").sideNav();

  // Datatable functionality
  $('#example').DataTable( {
      columnDefs: [
          {
              targets: [ 0, 1, 2 ],
              className: 'mdl-data-table__cell--non-numeric'
          }
      ]
  } );


});


