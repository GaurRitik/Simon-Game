// Declartions
var count = 0,
  pressIndex = 0;
var pattern = [];

var redSound=new Audio("sounds/red.mp3");
var yellowSound=new Audio("sounds/yellow.mp3");
var blueSound=new Audio("sounds/blue.mp3");
var greenSound=new Audio("sounds/green.mp3");
var wrongSound=new Audio("sounds/wrong.mp3");

function blink() {
  var select = Math.ceil(Math.random() * 4);
  if (select == 1) {
    select = "green";
    greenSound.play();
  } else if (select == 2) {
    select = "red";
    redSound.play();
  } else if (select == 3) {
    select = "blue";
    blueSound.play();
  } else if (select == 4) {
    select = "yellow";
    yellowSound.play();
  }
  $("#" + select).fadeOut();
  setTimeout(() => {
    $("#" + select).fadeIn();
  }, 10);
  count++;
  $("#level-title").text("Level " + count);
  pattern.push(select);

  pressIndex = 0; //In order to check from 0 index everytime after blink.
  //countOfCheck=0;//as we have to check from 0 index
}

function check(id) {
  if (pattern[pressIndex - 1] != id) {
    console.log(id);
    console.log(pressIndex - 1);
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    wrongSound.play();  
    $("#level-title").text("Game over. Press any key to restart");
    pattern = [];
    pressIndex = 0;
    count = 0;
  } else {
    //whole pattern match, then new blink
    if (pressIndex == pattern.length) {
      setTimeout(()=>{
        blink();
      },600);
    }
  }
  // console.log(pressIndex);
  // console.log(pattern.length);
}

    //Calling

// console.log(pattern);

// Key press to start the game

$("body").on("keypress", () => {
  // console.log(pattern.length==0);

  if (pattern.length == 0) {
    blink();
  }
});

$(".start").on("click", () => {
  // console.log(pattern.length==0);

  if (pattern.length == 0) {
    blink();
  }
});

$(".btn").on("click", (event) => {
//   console.log(event.currentTarget.id);
  var id = event.currentTarget.id;
 // console.log(id);
  if(id=='green'){
    greenSound.play();
  }
  else if(id=="red")
    redSound.play();
  else if(id=="blue")
    blueSound.play();
  else if(id=="yellow")
    yellowSound.play();
  $("#" + id).addClass("pressed");
  setTimeout(() => {
    $("#" + id).removeClass("pressed");
  }, 100);
  pressIndex++;
  check(id);
});
