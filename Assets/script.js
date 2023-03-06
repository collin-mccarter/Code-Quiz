// variables stated and linked to appropriate html assets
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var submitBtn = document.querySelector("#submit");

var initialsEl = document.querySelector("#initials");

// setting up variables for quiz length and time to answer each question
var questionList = 0;
var time = questions.length * 10;
var timerId;

// referencing the start button where when clicked -> starts quiz
startBtn.onclick = startQuiz;

// making the start quiz function
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide"); //hides the main starting text box/content

  questionsEl.removeAttribute("class"); // shows the hidden questions

  timerId = setInterval(tick, 1000); // begins the clock at 1 second interval

  timerEl.textContent = time;

  fetchQuestion(); // fetches the questions function
}

// making sure the clock ticks at the right time 
function tick() {
  time--; // timer counts down
  timerEl.textContent = time; // makes time value as text
  
  if (time <= 0) { // if timer = 0 then quiz is over
    quizEnd();
  }
}

// fetching question function
function fetchQuestion() {
  var currentQuestion = questions[questionList]; // setting 1st question as a variable

  // fetching for question title to be displayes in references title slot in html
  var titleEl = document.getElementById("question-title"); 
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = ""; // clearing choices values

  //setting choices form data set and making then buttons
  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice; // making choices as text content

    choiceNode.onclick = questionClick; // making action for when button is clicked

    choicesEl.appendChild(choiceNode);
  });
}

// function for when answer is chosen
function questionClick() {
  if (this.value !== questions[questionList].answer) {

    time -= 10; // if answer is wrong, 10 second penalty

    if (time < 0) { // when answer is wrong and less than 0 seconds are left after -10, sets timer to 0
      time = 0;
    }

    // displays "wrong" if incorrect choice is picked
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
  } else {
    // if correct answer is chosen, correct is displayed
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }

  // setting how long feedback is displayed for in html linked section
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // looping questions to make sure quiz cycles through all the questions
  questionList++;
  if (questionList === questions.length) {
    // if out of questions in the list, quiz ends
    quizEnd();
  } else {
    // if questions still are left, fetch new question
    fetchQuestion();
  }
}

// function to end the quiz
function quizEnd() {
  clearInterval(timerId); // clears timer

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class"); // displays end screen

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time; // setting score value as time

  questionsEl.setAttribute("class", "hide"); // hides question content
}

// when submit button is clicked -> execute save highscore function
submitBtn.onclick = saveHighscore; 

// function for saving the highscore
function saveHighscore() {
  var initials = initialsEl.value.trim(); // variable for initials

  // gets highscore array and adds new data to highscore array if initals are present
  if (initials !== "") {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };

    // adds highscores to string and adds them to score.html from local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "score.html";
  }
}

// when enter button is pressed
initialsEl.onkeyup = checkForEnter;

// function to see if "enter" key is pressed to save highscore
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
