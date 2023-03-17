var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 
var level = 0; 
var clicks = 0; 
var started = true; 

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 3); 
    var randomChosenColour = buttonColours[randomNumber]; 
    
    level += 1; 
    $("#level-title").text("Level " + level);  
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play(); 
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    myTimeout = setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            myTimeout = setTimeout(function() {
                clicks = 0; 
                userClickedPattern = []; 
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3"); 
        audio.play(); 
        $("body").addClass("game-over");
        myTimeout = setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }  
} 

function startOver() {
    started = true; 
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(clicks); 
    clicks += 1; 
}); 

$(document).keydown(function() {
    if (started === true)
    {
        gamePattern = []; 
        userClickedPattern = []; 
        level = 0;
        clicks = 0;
        userClickedPattern = []; 
        nextSequence(); 
        started = false; 
    }
}); 