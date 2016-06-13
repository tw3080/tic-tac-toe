// Variables
var turn = 'x';
var winner = null;
var numTurns = 1;

// Sets player 1 to 'x' and adds game description message
function startGame() {
  setMessage('Click any square on the board to start the game - ' + turn +
  ' will go first!');
}

// Set game description message
function setMessage(msg) {
  $('#description').hide().html(msg).fadeIn();
}

// Switches players every other turn, or declares winner/no winner
function switchTurn() {
  $('h1').removeClass('initialHeading').addClass('defaultHeading');
  if (checkWinner(turn)) {
    setMessage(turn + ' won!');
    addButton();
    winner = turn;
  } else if (numTurns == 9) {
    setMessage('No winner!');
    addButton();
  } else if (turn == 'x') {
    turn = 'o';
    numTurns++;
    setMessage(turn + "'s turn");
  } else {
    turn = 'x';
    setMessage(turn + "'s turn");
    numTurns++;
  }
}

// Checks for winner
function checkWinner(move) {
  var result = false;
  if (checkSquare(1, 2, 3, move) ||
      checkSquare(4, 5, 6, move) ||
      checkSquare(7, 8, 9, move) ||
      checkSquare(1, 4, 7, move) ||
      checkSquare(2, 5, 8, move) ||
      checkSquare(3, 6, 9, move) ||
      checkSquare(1, 5, 9, move) ||
      checkSquare(3, 5, 7, move)) {
        result = true;
  }
  return result;
}

// Checks for matching squares
function checkSquare(a, b, c, move) {
  var result = false;
  if (getSquare(a) == move && getSquare(b) == move && getSquare(c) == move) {
    result = true;
  }
  return result;
}

function getSquare(num) {
  var square = $('#s' + num).text();
  return square;
}

// Adds 'new game' button
function addButton() {
  $('.button').hide().fadeIn();
  $('.button').html('<button id="new-game">New Game?</button>');
}

// Clear squares
function clearSquares(num) {
  $('#s' + num).text('');
}

// Star a new game
function newGame() {
  turn = 'x';
  winner = null;
  numTurns = 1;
  for (var i = 1; i <= 9; i++) {
    clearSquares(i);
  }
  $('h1').removeClass('finalHeading').addClass('defaultHeading');
  setMessage(turn + "'s turn!");
}

// Events
$('.col-1-3').on('click', function() {
  var clickedSquare = $(this);
  if (winner !== null) {
    return;
  } else if (clickedSquare.children().length === 0) {
    clickedSquare.html('<p>' + turn + '</p>');
    switchTurn();
  }
});

$(document).on('click', '#new-game', function() {
  newGame();
  $('.button').fadeOut();
});

// Starts game on page load
$(function() {
  startGame();
});
