function init() {
  // Construct the truck
  $('#truck-container').append(
    $('<div/>', {id: 'truck'}).append(
      $('<div/>', {class: 'wheel front left'}),
      $('<div/>', {class: 'wheel front right'}),
      $('<div/>', {class: 'wheel rear left'}),
      $('<div/>', {class: 'wheel rear right'}),
    )
  );
}

window.onload = init;
