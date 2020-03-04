var gameCards = document.getElementById("gameCards");
gameCards.addEventListener("click", handleClick)


function handleClick(event){
  if(event.target.className.indexOf("back-card") === -1){
    return;
  }
  var clicked = event.target;
  console.log(clicked)
  clicked.classList.add("hidden")
}
