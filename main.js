var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick)


function handleClick(event){
  if(event.target.className.indexOf("back-card") === -1){
    return;
  }
  var clicked = event.target;
  clicked.classList.add("hidden")

  if(!firstCardClicked){
    firstCardClicked = event.target;
    console.log(firstCardClicked);
  }else{
    secondCardClicked = event.target;
    console.log(secondCardClicked);
  }
}

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
