//Start Game

var startButton = document.getElementById("startGame")
startButton.children[0].addEventListener("click",startGame)
var divCards = document.querySelectorAll('.cards');
var arrayFront = ["css-logo", "docker-logo", "github-logo", "html-logo", "js-logo",
  "mysql-logo", "node-logo", "php-logo", "react-logo"];
var backCards;
var frontCards;
function startGame(){
  clearInterval(rainbowChange);
  var twoCards = {frontCards,backCards}
  for (var addCardIndex = 0; addCardIndex < divCards.length; addCardIndex++) {
    var tempBack = document.createElement("div");
    tempBack.classList.add("back-card");
    var tempFront = document.createElement("div");
    if (addCardIndex < arrayFront.length) {
      tempFront.classList.add("front-card", arrayFront[addCardIndex])
    } else {
      tempFront.classList.add("front-card", arrayFront[addCardIndex - arrayFront.length])
    }
    divCards[addCardIndex].appendChild(tempFront)
    divCards[addCardIndex].appendChild(tempBack)
  }
  startButton.classList.add("hidden")
  backCards = document.querySelectorAll(".back-card");
  frontCards = document.querySelectorAll(".front-card");
  setTimer();
  shuffle();
  showBack();
  return twoCards;
}

//Click card effects
var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick)
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var modal = document.getElementById("modal");
var modal2 = document.getElementById("modal2")
var button = document.getElementsByClassName("button")


function removeHidden() {
  firstCardClicked.parentElement.classList.remove("flip-cards")
  secondCardClicked.parentElement.classList.remove("flip-cards")
  firstCardClicked = null;
  secondCardClicked = null;
  gameCards.addEventListener("click", handleClick)
}

function handleClick(event){
  if(event.target.className.indexOf("back-card") === -1){
    return;
  }
  var clicked = event.target;
  clicked.parentElement.classList.add("flip-cards")
  if(!firstCardClicked){
    firstCardClicked = event.target;
    console.log("The first card",firstCardClicked)
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  }else if (firstCardClicked != event.target){
    secondCardClicked = event.target;
    console.log("The second card",secondCardClicked)
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener("click", handleClick);

    if(firstCardClasses === secondCardClasses){
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      if(matches === maxMatches){
        modal.classList.remove("hidden")
        button[0].addEventListener("click",resetGame)
      }
      setTimeout(function(){gameCards.addEventListener("click", handleClick)},100);
    }else{
      setTimeout(removeHidden,1500)
    }
    if (attempts === maxAttempts && matches != maxMatches) {
      gameOver();
    }
    attempts++;
    displayStats();
  }
}

//Display Stats
var attempts = 0;
var gamesPlayed = 0;
var gamesPlayedDocument = document.getElementById("gamesPlayed");
var attemptsPlayed = document.getElementById("gamesAttempts");
var gamesAccuracy = document.getElementById("gamesAccuracy");

function displayStats(){
  attemptsPlayed.textContent = attempts;
  gamesAccuracy.textContent = calculateAccuracy(attempts,matches) + "%";
}

function calculateAccuracy(attempts,matches){
 if(attempts){
    return Math.trunc(100* matches/attempts)
 }
}

//Reset Game
function resetGame(){
  gamesAccuracy.textContent = "0%";
  attemptsPlayed.textContent = "N/A";
  matches = 0;
  attempts = 0;
  gamesPlayed++
  gamesPlayedDocument.textContent = gamesPlayed
  resetCards();
  if (modal.className.indexOf("hidden") === -1){
    modal.classList.add("hidden");
  }
  if(modal2.className.indexOf("hidden") === -1){
    modal2.classList.add("hidden");
  }
  setTimer();
  shuffle();
  showBack();
}




function resetCards(){
  for(var cardIndex = 0; cardIndex < backCards.length; cardIndex++){
    divCards[cardIndex].classList.remove("flip-cards")
  }
}


//Shuffle array
var shuffleArray = [];
var cardDiv = document.getElementsByClassName("back-card");

function shuffle() {
  for (var putInIndex = 0; putInIndex < frontCards.length; putInIndex++) {
    shuffleArray[putInIndex] = frontCards[putInIndex].className;
    frontCards.className = "";
  }
  for (var putBack = shuffleArray.length - 1; putBack > 0; putBack--) {
    var j = Math.floor(Math.random() * putBack)
    var temp = shuffleArray[putBack]
    shuffleArray[putBack] = shuffleArray[j]
    shuffleArray[j] = temp
  }
  for (var i = 0; i < shuffleArray.length; i++) {
    cardDiv[i].previousElementSibling.className = shuffleArray[i]
  }
}

var maxAttempts = arrayFront.length + 4//+ gamesPlayed; for dynamic addition of extra cards
function gameOver(){
  modal2.classList.remove("hidden");
  button[1].addEventListener("click",resetGame)
}

//Shows front card
function showBack() {
  for(var hideCardIndex = 0; hideCardIndex < backCards.length; hideCardIndex++ ){
    frontCards[hideCardIndex].classList.add("front-card-show");
    backCards[hideCardIndex].classList.add("hidden")
  }
  setTimeout(function(){
    for(var hideCardInner = 0; hideCardInner < backCards.length; hideCardInner++){
      backCards[hideCardInner].classList.remove("hidden");
      frontCards[hideCardInner].classList.remove("front-card-show")
    }
  },1500)

}


//Create Timer
function timer(time){
  var minutes = Math.floor(time/60);
  if(time % 60 > 10){
    var seconds = time % 60;
  }else{
    if(time % 60 < 10){
      seconds = "0" + (time % 60);
    }else{
      seconds = time;
    }
  }
  return minutes + ":" + seconds;
}

var time_limit = 130;

function setTimer(){
  var timerInterval = setInterval(function(){
    time_limit--;
    var timeDiv = document.getElementById("timer")
    timeDiv.textContent = timer(time_limit);
    if(time_limit === 0 || attempts === maxAttempts || matches === maxMatches){
      clearInterval(timerInterval);
      if(time_limit === 0){
      gameOver();
      }
      return time_limit = 130;
    }
  },1000)
}

var rainbowChange;
var colorIndexArray = ["red","orange","yellow","green","blue","indigo","violet"]
var backColorIndex = 0;
var colorIndex = colorIndexArray.length - 1;
var llamaMode = document.getElementById("llamaMode");
llamaMode.addEventListener("click",changeBackgroundColor);
var startModalBackground = document.getElementById("startGame");
function changeBackgroundColor (){
  rainbowChange = setInterval(()=>{

      startModalBackground.style.backgroundColor = colorIndexArray[backColorIndex];
      startModalBackground.style.color = colorIndexArray[colorIndex];
      if(backColorIndex < colorIndexArray.length - 1){
        backColorIndex++;
      }else {
        backColorIndex = 0;
      }
      if(colorIndex >= 0){
        colorIndex--;
      }else{
        colorIndex = colorIndexArray.length -1
      }
    console.log(startModalBackground.style,backColorIndex,colorIndex)
  }, 100)
  llamaMode.removeEventListener("click", changeBackgroundColor)
  return rainbowChange;
}
