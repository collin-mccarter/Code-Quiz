var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var submitBtn = document.querySelector("#submit");

var initialsEl = document.querySelector("#initials");

var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

startBtn.onclick = startQuiz;

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  
  if (time <= 0) {
    quizEnd();
  }
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {

    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

submitBtn.onclick = saveHighscore;

function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "score.html";
  }
}

initialsEl.onkeyup = checkForEnter;

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
