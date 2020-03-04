
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
modal.addEventListener("click",resetGame)

function resetGame(){
  gamesAccuracy.textContent = "0%";
  attemptsPlayed.textContent = "N/A";
  matches = 0;
  attempts = 0;
  gamesPlayed++
  gamesPlayedDocument.textContent = gamesPlayed
  resetCards();
  modal.classList.add("hidden")
  shuffle();
}

var allCards = document.querySelectorAll(".back-card")

function resetCards(){
  for(var cardIndex = 0; cardIndex < allCards.length; cardIndex++){
    allCards[cardIndex].classList.remove("hidden")
  }
}

var frontCards = document.querySelectorAll(".front-card");
var shuffleArray = [];
var cardDiv = document.getElementsByClassName("back-card");

function shuffle(){

  for (var putInIndex = 0; putInIndex < frontCards.length; putInIndex++) {
    if (gamesPlayed === 1) {
      shuffleArray[putInIndex] = frontCards[putInIndex];
      frontCards[putInIndex].remove();}
    if (putInIndex != 0) {
      var j = Math.floor(Math.random() * shuffleArray.length)
      var temp = shuffleArray[putInIndex]
      shuffleArray[putInIndex] = shuffleArray[j]
      shuffleArray[j] = temp
    }
  }

  for (var i = 0; i < shuffleArray.length; i++) {
    cardDiv[i].before(shuffleArray[i]);
  }
}

// for(var putInIndex = 0; putInIndex < frontCards.length; putInIndex++){
//   shuffleArray[putInIndex] = frontCards[putInIndex].className;
//   frontCards.className = "";
// }
// var cardDiv = document.getElementsByClassName("back-card");
// for (var putBack = shuffleArray.length - 1; putBack > 0; putBack--) {
//   var j = Math.floor(Math.random() * putBack)
//   var temp = shuffleArray[putBack]
//   shuffleArray[putBack] =shuffleArray[j]
//   shuffleArray[j] = temp
// }
// for(var i = 0; i < shuffleArray.length; i++){
//   cardDiv[putBack].previousElementSibling.className = shuffleArray[putBack]
// }
