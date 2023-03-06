// function to print highscores
function printHighscores() {
  // gets stored highscores from local storage
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || []; 
  
  // sorts scores from highest to lowest value
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });
  
  // function to create each highscore as a list element
  highscores.forEach(function(score) {
    // creates li
    var liTag = document.createElement("li"); 
    liTag.textContent = score.initials + " - " + score.score; // adds initials to li

    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag); // creates highscore and adds it to list
  });
}
  
// removes all stores highscore data from local storage
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
  
document.getElementById("clear").onclick = clearHighscores; // linking button on click to execute clearHighscores function

// prints out the highscores at the end of the function
printHighscores(); 