var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userColorPattern = [];
var isGaming = false;
var level = 0;
var curIndex = 1;
startGame();

function startGame() {
  if (!isGaming) {
    $(document).keypress(function () {
      $("#level-title").html("Remember the color sequence!");
      setTimeout(function () {
        nextSequence();
        isGaming = true;
      }, 3000);
      $(document).off("keypress");
    });
  }
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  userAnimation(userChosenColor);
  if (isGaming) {
    userColorPattern.push(userChosenColor);
    if (curIndex <= level) {
      if (userColorPattern[curIndex - 1] !== gamePattern[curIndex - 1]) {
        $("#level-title").html(
          "GAME OVER ! You remembered " +
            (level - 1) +
            " colors! </br> Press any key to restart."
        );
        var gameOverAudio = new Audio("./sounds/wrong.mp3");
        gameOverAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        isGaming = false;
        gamePattern = [];
        userColorPattern = [];
        level = 0;
        curIndex = 1;
        startGame();
      } else if (curIndex === level) {
        $("#level-title").html("Well Done! </br> Be ready for the next one!");
        setTimeout(function () {
          nextSequence();
        }, 1500);
        userColorPattern = [];
        curIndex = 1;
      } else {
        curIndex++;
      }
    }
  }
});

function userAnimation(userChosenColor) {
  $("#" + userChosenColor).addClass("pressed");
  var audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
  setTimeout(function () {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
}

function gameAnimation(randomChosenColor) {
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  elementFlash(randomChosenColor);
}

function elementFlash(element) {
  $("#" + element)
    .animate({ opacity: 0.3 })
    .animate({ opacity: 1 });
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  level++;
  $("#level-title").html("COLOR " + level + '</br> Click "whole" sequence');
  gamePattern.push(randomChosenColor);
  gameAnimation(randomChosenColor);
}
