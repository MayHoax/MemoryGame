let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let isGamestarted = false;
let userClickedPattern = [];
let level = 0;


function nextSequence(){
    
    level += 1;
    $("h1").text(`Level ${level}`); 
    userClickedPattern = [];
    
    let randomNumber = Math.floor(Math.random() *4);
    let randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    makeFlash(randomChosenColor);
    playSound(randomChosenColor);

    
}


function makeFlash(chosenColor){
    $("." + chosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}


function playSound(chosenSound){
    let sound = new Audio(`sounds/${chosenSound}.mp3`);
    setTimeout(function(){
        sound.play()
    }, 100);
}

function animatePress(currentColor){
    $(`.${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`.${currentColor}`).removeClass("pressed");
    }, 100)
};

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
        }
         else {
                let wrongAudio = new Audio("sounds/wrong.mp3");
                wrongAudio.play();
                $("body").addClass("game-over")
                setTimeout(function(){
                    $("body").removeClass("game-over");
                }, 200);
                $("h1").text("Game Over, Press Any Key to Restart");
                startOver();
                
        }
};

function startOver(){
    level = 0;
    gamePattern = [];
    isGamestarted = false;
}


$(document).on("keypress", function(){
    if (!isGamestarted){
    isGamestarted = true;
    nextSequence();
}
})


$(".btn").on("click", function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

})


