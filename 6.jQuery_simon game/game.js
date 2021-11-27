var userClickedPattern = [];

var buttonColors = ["red","blue","green",'yellow'];

var gamePattern = [];
 //restart
 function restart(){
    level = 0;

    gamePattern = [];
    started = false;
}


var started = false; 
 //DETECTING KEYBOARD PRESS AND START 
 var level = 0;
 $(document).keydown(function(){
     if(!started){
         $("#level-title").text("Level "+level);
         nextSequence();
         started = true;
     }
    //  else{
    //      nextSequence();
    //  }
 });

 // WHEN USER CLICKS

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});


// GENERATING RANDOM

function nextSequence() {
    userClickedPattern = [];

    level++;


    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor((Math.random() * 3)) + 1; 
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
 
 }


//Check Answer
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        restart();
    }
}

// SOUND FUNCTION
 function playSound(name){

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
 }

 //USER CLICK ANIMATION
 function animatePress(currentColor){
     $("#"+currentColor).addClass("pressed");
     setTimeout(function(){
         $("#"+currentColor).removeClass("pressed");
        },100);

 }
