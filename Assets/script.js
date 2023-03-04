var startBtn = document.querySelector("#start-button")
var questionsEl = document.querySelector("#questions-text");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#answer-choices");
var initialsEL = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var rightOrWrong = document.querySelector("#rightOrWrong")

var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class","hidden");

    questionsEl.setAttribute("class","show");

    timerID = setInterval(timerTick,1000);

    timerEl.textContent = time;

    getQuestions();
}

function timerTick() {
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
        var choiceSelection = document.createElement("button");
        choiceSelection.setAttribute("class", "choice");
        choiceSelection.setAttribute("value", choice);

        choiceSelection.textContent = i + 1 + ". " + choice;

        choiceSelection.onclick = questionClick;

        choicesEl.appendChild(choiceSelection);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
        rightOrWrong.textContent = "Incorrect";
        rightOrWrong.style.color = "red";
        // rightOrWrong.style.fontSize = "200%";
    } else {
        rightOrWrong.textContent = "Correct";
        rightOrWrong.style.color = "green";
        // rightOrWrong.style.fontSize = "200%";
    }

    rightOrWrong.setAttribute("class","rightOrWrong");
    setTimeout(function() {
        rightOrWrong.setAttribute("class", "rightOrWrong hide");
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
  
    var endEl = document.getElementById("end");
    endEl.setAttribute("show");
  
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
  
    questionsEl.setAttribute("class", "hide");
}

function saveHighscore() {
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      var newScore = {
        score: time,
        initials: initials
      };
  
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      window.location.href = "score.html";
    }
}
  
function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;
  
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;