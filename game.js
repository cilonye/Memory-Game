var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;

var userClickedPattern = [];
var count = 0

function nextSequence () {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(50).fadeIn(50); 
    playSound(randomChosenColor);
    console.log(gamePattern)
    
    
    $("#level-title").text(`Level ${level}`);
    level++;

    userClickedPattern = [];
    count = 0;
}

$(document).on('click', function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    count++;
    if (count === level) {
        var state = checkAnswer(level)
        console.log(state);
        if (state === true) {
            setTimeout(function (){
                nextSequence();
            }, 1000)
        }else {
            gameOver();
        }
    }
})

$(document).on("keydown", function (){
    nextSequence();
})

function playSound(key){
    const audio = new Audio(`sounds/${key}.mp3`);
    audio.play();
}

function animatePress(key){
    $(`#${key}`).addClass('pressed')
    setTimeout(function(){
        $(`#${key}`).removeClass('pressed'), 100
    })
}

function checkAnswer(level){
    return gamePattern[level-1] === userClickedPattern[level-1]
}

function gameOver(){
    var sound = "wrong"
    playSound(sound);
    $("body").addClass('game-over')
    setTimeout(function(){
        $('body').removeClass('game-over'), 200
    })
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
}