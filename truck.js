import { Matrix2x2 } from './mat.js'

const MOVE_AMOUNT = 10;

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

  $(window).on('keydown', (evt) => {
    switch (evt.key) {
      case 'w':
        transformTruck(true);
        break;
      case 'a':
        break;
      case 's':
        transformTruck(false);
        break;
      case 'd':
        break;
      default:
        break;
    }
  });
}

function transformTruck(forward) {
  let tf = $('#truck').css('transform');
  let mat = new Matrix2x2(tf);
  mat.translate(0, forward ? -MOVE_AMOUNT : MOVE_AMOUNT);
  console.log(tf);
  console.log(mat);
  console.log(mat.getCssString());
  $('#truck').css('transform', mat.getCssString());
  console.log($('#truck').css('transform'));
}

window.onload = init;
