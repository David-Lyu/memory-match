
var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick)
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var counter = 0;

function removeHidden() {
  firstCardClicked.classList.remove("hidden")
  secondCardClicked.classList.remove("hidden")
  firstCardClicked = null;
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
    if(firstCardClasses === secondCardClasses){
      console.log("image matches");
      firstCardClicked = null;
      secondCardClicked = null;
      gameCards.addEventListener("click",handleClick)
    }else{
      console.log("image does not match");
      setTimeout(function() {
        firstCardClicked.classList.remove("hidden")
        secondCardClicked.classList.remove("hidden")
        gameCards.addEventListener("click", handleClick)
        firstCardClicked = null;
        secondCardClicked = null;
      },1500)
    }

  }
}
