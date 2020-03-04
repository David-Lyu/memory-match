
var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick)
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var modal = document.getElementById("modal");


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
    if(firstCardClasses === secondCardClasses){
      firstCardClicked = null;
      matches++;
      gameCards.addEventListener("click", handleClick)
      if(matches === maxMatches){
        modal.classList.remove("hidden")
        gameCards.addEventListener("click", handleClick)
      }
    }else{
      setTimeout(removeHidden,0)
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
 }else{return "0%";}
}
modal.addEventListener("click",resetGame)

function resetGame(){
  gamesAccuracy.textContent = "0%"
  matches = 0;
  attempts = 0;
  gamesPlayed++
  gamesPlayedDocument.textContent = gamesPlayed
  resetCards();
  modal.classList.add("hidden")
}

var allCards = document.querySelectorAll(".back-card")

function resetCards(){
  for(var cardIndex = 0; cardIndex < allCards.length; cardIndex++){
    allCards[cardIndex].classList.remove("hidden")
  }
}
