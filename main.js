
var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick)
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;

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
  if(matches < maxMatches)
  if(!firstCardClicked){
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  }else{
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;


    gameCards.removeEventListener("click", handleClick);
    if(firstCardClasses === secondCardClasses){
      firstCardClicked = null;
      matches++;
      if(matches === maxMatches){
        var modal = document.getElementById("modal");
        modal.classList.remove("hidden")
      }
      gameCards.addEventListener("click",handleClick)
    }else{
      setTimeout(removeHidden,1500)

    }

  }
}
