var startButton = document.getElementById("startGame")
startButton.addEventListener("click",startGame)
var divCards = document.querySelectorAll('.cards');
var arrayFront = ["css-logo", "docker-logo", "github-logo", "html-logo", "js-logo",
  "mysql-logo", "node-logo", "php-logo", "react-logo"];
var backCards;
var frontCards;
function startGame(){
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
  shuffle();
  showBack();
  return twoCards;
}


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
  firstCardClicked.classList.remove("hidden")
  secondCardClicked.classList.remove("hidden")
  firstCardClicked = null;
  gameCards.addEventListener("click", handleClick)
}

function handleClick(event){
  if(event.target.className.indexOf("back-card") === -1){
    return;
  }
  var clicked = event.target;
  clicked.classList.add("hidden")
  if(!firstCardClicked){
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  }else{
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener("click", handleClick);
    attempts++;
    gameOver();
    if(firstCardClasses === secondCardClasses){
      firstCardClicked = null;
      matches++;
      gameCards.addEventListener("click", handleClick)
      if(matches === maxMatches){
        modal.classList.remove("hidden")
        button[0].addEventListener("click",resetGame)
      }
    }else{
      setTimeout(removeHidden,1500)
    }
    displayStats();
  }
}

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
  shuffle();
  showBack();
}




function resetCards(){
  for(var cardIndex = 0; cardIndex < backCards.length; cardIndex++){
    backCards[cardIndex].classList.remove("hidden")
  }
}

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
  if(attempts === maxAttempts && matches != maxMatches){
    modal2.classList.remove("hidden");
    button[1].addEventListener("click",resetGame)
  }
}

function showBack() {
  for(var hideCardIndex = 0; hideCardIndex < backCards.length; hideCardIndex++ ){
    backCards[hideCardIndex].classList.add("hidden");
  }
  setTimeout(function(){
    for(var hideCardInner = 0; hideCardInner < backCards.length; hideCardInner++){
      backCards[hideCardInner].classList.remove("hidden");
    }
  },1000)

}
