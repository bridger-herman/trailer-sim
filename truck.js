import { Matrix2x2 } from './mat.js'

const TRANSLATE_AMOUNT = 10;
const ROTATE_AMOUNT = Math.PI/24;
const TRUCK_ROTATE_GAIN = 0.10;
const TRAILER_ROTATE_GAIN = 0.10;

function init() {
  // Construct the truck
  $('#truck-container').append(
    $('<div/>', {id: 'truck'}).append(
      $('<div/>', {class: 'wheel front left'}),
      $('<div/>', {class: 'wheel front right'}),
      $('<div/>', {class: 'wheel rear left'}),
      $('<div/>', {class: 'wheel rear right'}),
    $('<div/>', {id: 'trailer'}).append(
      $('<div/>', {class: 'trailer-wheel front left'}),
      $('<div/>', {class: 'trailer-wheel mid left'}),
      $('<div/>', {class: 'trailer-wheel rear left'}),
      $('<div/>', {class: 'trailer-wheel front right'}),
      $('<div/>', {class: 'trailer-wheel mid right'}),
      $('<div/>', {class: 'trailer-wheel rear right'}),
    )
    )
  );

  $(window).on('keydown', (evt) => {
    switch (evt.key) {
      case 'w':
        transformTruck(true);
        break;
      case 'a':
        turnWheels(false);
        break;
      case 's':
        transformTruck(false);
        break;
      case 'd':
        turnWheels(true);
        break;
      default:
        break;
    }
  });
}

function transformTruck(forward) {
  // Transform the truck
  let truckMat = new Matrix2x2($('#truck').css('transform'));
  let wheelAngle = new Matrix2x2($('.wheel.front').css('transform')).angle *
    TRUCK_ROTATE_GAIN;
  if (forward) {
    truckMat.rotate(wheelAngle);
  } else {
    truckMat.rotate(-wheelAngle);
  }
  truckMat.translateWithAngle(forward ? -TRANSLATE_AMOUNT : TRANSLATE_AMOUNT);
  $('#truck').css('transform', truckMat.getCssString());

  // Move the trailer based on truck movement
  let trailerMat = new Matrix2x2($('#trailer').css('transform'));
  let truckAngle = truckMat.angle;
  trailerMat.angle = -truckAngle;
  $('#trailer').css('transform', trailerMat.getCssString());
}

function turnWheels(right) {
  let mat = new Matrix2x2($('.wheel.front').css('transform'));
  mat.rotate(right ? -ROTATE_AMOUNT : ROTATE_AMOUNT);
  $('.wheel.front').css('transform', mat.getCssString());
}

window.onload = init;
