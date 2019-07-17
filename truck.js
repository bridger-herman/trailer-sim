import { Matrix2x2 } from './mat.js'

const TRANSLATE_AMOUNT = 10;
const ROTATE_AMOUNT = Math.PI/24;
const TRUCK_ROTATE_GAIN = 0.10;
const TRAILER_ROTATE_GAIN = 0.98;
const TRAILER_ROTATE_DRAG = 0.04;

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

  // Construct the parking lot
  for (let i = 0; i < 13; i++) {
    $('#parking-lot').append($('<div/>', {
      class: 'line vert-line',
      css: {
        'left': i * 110,
        'top': 200,
      }
    }));
  }
  $('#parking-lot').append($('<div/>', {
    class: 'line horiz-line',
    css: {
      'top': 390,
    }
  }));

  $(window).on('keydown', (evt) => {
    switch (evt.key) {
      case 'w':
      case 'ArrowUp':
        transformTruck(true);
        break;
      case 'a':
      case 'ArrowLeft':
        turnWheels(false);
        break;
      case 's':
      case 'ArrowDown':
        transformTruck(false);
        break;
      case 'd':
      case 'ArrowRight':
        turnWheels(true);
        break;
      default:
        break;
    }
  });
}

function transformTruck(forward) {
  let truckMat = new Matrix2x2($('#truck').css('transform'));
  let trailerMat = new Matrix2x2($('#trailer').css('transform'));

  if (Math.abs(trailerMat.angle) > Math.PI/2) {
    $('header').append($('<p/>', {text: 'You jackknifed'}));
    return;
  }

  // Transform the truck based on steer wheel rotation
  let oldTruckAngle = truckMat.angle;

  let wheelAngle = new Matrix2x2($('.wheel.front').css('transform')).angle *
    TRUCK_ROTATE_GAIN;
  if (forward) {
    truckMat.rotate(wheelAngle);
  } else {
    truckMat.rotate(-wheelAngle);
  }
  truckMat.translateWithAngle(forward ? -TRANSLATE_AMOUNT : TRANSLATE_AMOUNT);

  // Move the trailer based on truck movement
  let newTruckAngle = truckMat.angle;
  let rotateForce = TRAILER_ROTATE_GAIN * (oldTruckAngle - newTruckAngle);
  let centeringForce = -trailerMat.angle * TRAILER_ROTATE_DRAG;
  centeringForce = forward ? centeringForce : -centeringForce;
  trailerMat.rotate(rotateForce + centeringForce);

  $('#truck').css('transform', truckMat.getCssString());
  $('#trailer').css('transform', trailerMat.getCssString());
}

function turnWheels(right) {
  let mat = new Matrix2x2($('.wheel.front').css('transform'));
  mat.rotate(right ? -ROTATE_AMOUNT : ROTATE_AMOUNT);
  if (mat.angle > Math.PI/4) {
    mat.angle = Math.PI/4;
  } else if (mat.angle < -Math.PI/4) {
    mat.angle = -Math.PI/4;
  }
  $('.wheel.front').css('transform', mat.getCssString());
}

window.onload = init;
