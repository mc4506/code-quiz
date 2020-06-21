var startBtn = document.getElementById("start-btn");
var nextBtn = document.getElementById("next-btn");
var saveScoreBtn = document.getElementById("save-score");

var scoreRow = document.querySelector(".score-row");
var buttonRow = document.querySelector(".button-row");

var quizTimeLimit = 15;
var timerID = document.getElementById("timer");

var scoreID = document.getElementById("score");
var userScore = 0; // initialize score
var answeredCorrectly = 0; // initialize number of correctly answered questions

var contentDiv = document.querySelector(".content");
var questionDiv = document.getElementById("question-content");
var multipleChoiceUL = document.getElementById("multiple-choices");

var formContainer = document.getElementById("form-content");
var userNameInput = document.getElementById("user-name");

var questionNumber = 0;
var timerIntertval;

var users = [];

// FUNCTION TO START QUIZ
function startQuiz() {
  scoreRow.style.display = "flex"; // Unhide score-row container
  startBtn.style.display = "none"; // hide start button
  contentDiv.style.display = "none"; // hide the p tag content
  countdown(); // start the countdown
  displayQuestion(); // display first question after Start button is clicked
}

// FUNCTION FOR TIMER COUNTDOWN
function countdown() {
  timerIntertval = setInterval(function () {
    quizTimeLimit -= 1;
    timerID.textContent = "Timer: " + quizTimeLimit + "s";
    if (quizTimeLimit <= 10) {
      timer.style.color = "red";
    }
    if (quizTimeLimit <= 0) {
      stopCountdown();
      quizTimeLimit = 0;
      clearList();
      displayTimesUp();
      setTimeout(displayUserScore, 1000);
      return;
    }
  }, 1000);
}

// FUNCTION TO STOP TIMER
function stopCountdown() {
  clearInterval(timerIntertval);
}

// FUNCTION TO SHOW QUESTION AND CREATE li TAGS TO SHOW MULTIPLE CHOICES
function displayQuestion() {
  buttonRow.style.display = "none";
  questionDiv.children[0].textContent = `Question ${questionNumber + 1}: ${questionsList[questionNumber].question}`;

  for (let j = 0; j < questionsList[questionNumber].choices.length; j++) {
    // create a list element for each choice available
    let liElement = document.createElement("li");
    multipleChoiceUL.appendChild(liElement);
    liElement.id = j;

    let abcd = "ABCD";
    multipleChoiceUL.children[j].textContent = abcd[j] + ": " + questionsList[questionNumber].choices[j];
  }
}

// FUNCTION TO SHOW NEXT QUESTION
function nextQuestion() {
  questionNumber++;
  clearList();
  if (questionNumber < questionsList.length) {
    displayQuestion();
  } else {
    stopCountdown();
    displayUserScore();
  }
}

// FUNCTION TO SELECT FROM LIST OF MULTIPLE CHOICES
function selectAnswer(event) {
  var userAnswer = event.target.id;

  console.log(userAnswer);
  if (userAnswer == questionsList[questionNumber].answer) {
    multipleChoiceUL.children[userAnswer].textContent += " <== Correct!";
    multipleChoiceUL.children[userAnswer].style.color = "green";
    addScore();
    answeredCorrectly += 1;
    buttonRow.style.display = "flex";
    // multipleChoiceUL.removeEventListener("click", selectAnswer);
  } else {
    multipleChoiceUL.children[userAnswer].textContent += " <== Incorrect";
    multipleChoiceUL.children[userAnswer].style.color = "red";
    substractTime();
    buttonRow.style.display = "flex";
    // multipleChoiceUL.removeEventListener("click", selectAnswer);
  }
}

// FUNCTION TO DISPLAY TIME'S UP
function displayTimesUp() {
  buttonRow.style.display = "none";
  scoreRow.removeChild(scoreID);
  scoreRow.style.justifyContent = "center";
  timerID.style.fontSize = "36px";
  timerID.textContent = "TIME IS UP!";
  questionDiv.children[0].textContent = "";
}

// FUNCTION TO DISPLAY userSore, answeredCorrectly, and ASK USER TO ENTER THEIR NAME
function displayUserScore() {
  scoreRow.style.display = "none";
  buttonRow.style.display = "none";
  questionDiv.style.display = "none";
  formContainer.style.display = "flex";
  saveScoreBtn.style.display = "flex";

  if (answeredCorrectly === questionsList.length) {
    userScore += 50;
    formContainer.children[0].textContent = `You get 50 bonus points for answering all the questions correctly! You scored ${userScore} points`;
  } else {
    formContainer.children[0].textContent = `You scored ${userScore} points`;
  }
}

function saveScore(event) {
  event.preventDefault();
  let userName = userNameInput.value;
  // console.log(userName);
  let user = { name: userName, score: userScore };
  users = JSON.parse(localStorage.getItem("users"));
  users.push(user);
  // console.log(users);
  localStorage.setItem("users", JSON.stringify(users));
  sortHighScores();
}

function sortHighScores() {
  function compare(a, b) {
    let comparison = 0;
    if (a.score < b.score) {
      comparison = 1;
    } else if (a.score > b.score) {
      comparison = -1;
    }
    return comparison;
  }
  users.sort(compare);
   //console.log(users);
}

function displayHighScore() {
  
}



// FUNCTION TO ADD TO userScore
function addScore() {
  userScore += 10; // add 10 points
  console.log(userScore);
  scoreID.textContent = "Score: " + userScore;
}

// FUNCTION TO SUBTRACT 5 seconds FROM quizTimeLimit
function substractTime() {
  quizTimeLimit -= 5; // substract 5 seconds
}

// FUNCTION CLEAR LIST
function clearList() {
  while (multipleChoiceUL.firstChild) {
    multipleChoiceUL.removeChild(multipleChoiceUL.firstChild);
  }
}

startBtn.addEventListener("click", startQuiz);
multipleChoiceUL.addEventListener("click", selectAnswer);
nextBtn.addEventListener("click", nextQuestion);
saveScoreBtn.addEventListener("click", saveScore);
