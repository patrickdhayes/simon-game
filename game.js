console.log($('h1'));
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var h1 = $('h1');
var gameState = false;
var speed = 1000;
var gameLoop;
var green = $('#green-audio')[0];
var red = $('#red-audio')[0];
var yellow = $('#yellow-audio')[0];
var blue = $('#blue-audio')[0];

function playSound(name) {
  // var sound = new Audio('./sounds/' + name + '.mp3');
  var sound = $('#' + name + '-audio')[0];
  sound.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  var id = '#' + randomChosenColour;
  gamePattern.push(randomChosenColour);
  var looper = 0;
  if(level >= 3) {
    speed = 750;
  }
  if(level >= 5) {
    speed = 600;
  }
  if (level >=10 ) {
    speed = 500;
  }
  if (level >=13 ) {
    speed = 350;
  }
  if (level >=15 ) {
    speed = 250;
  }
  console.log('This is a looper: ',looper);
  gameLoop = setInterval(function() {
    // animatePress(gamePattern[looper]);
    playSound(gamePattern[looper]);
    console.log('Game Looper: ',gamePattern[looper]);
    $('#' + gamePattern[looper]).fadeOut(100).fadeIn(100);
    looper++;
    if (looper === gamePattern.length) {
      console.log('Game Pattern Length: ',gamePattern.length);
        clearInterval(gameLoop);
        console.log('Hello');
        // looper = 0;
    }
  }, speed);


  h1.text('level ' + level);

  // playSound(randomChosenColour);
  // $(id).fadeOut(100).fadeIn(100);
  level++;
  console.log('game pattern: ',gamePattern);


}

$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

function restart() {
  gameState = false;
  level = 0;
  speed = 1000;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('Correct');

    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    h1.text('Game Over, Your Score is: ' + level + 'Press Any Key to Restart');
    clearInterval(gameLoop);
    restart();
    console.log('Incorrect');
  }
}

// console.log(nextSequence());
function animatePress(curentColour) {
  var currentButton = '#' + curentColour;
  $(currentButton).addClass('pressed');
  setTimeout(function() {
    $(currentButton).removeClass('pressed');
  }, 100);
}
$('body').click(function() {
  if(!gameState) {
    nextSequence();
    gameState = true;
  }
});

$(document).keypress(function() {
  if(!gameState) {
    nextSequence();
    gameState = true;
  }
});
