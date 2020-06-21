// Global variables
var startBtn = document.getElementById("start-btn");
var saveScoreBtn = document.getElementById("save-score");

var scoreRow = document.querySelector(".score-row");

var quizTimeLimit = 60;
var timerID = document.getElementById("timer");

var scoreID = document.getElementById("score");
var userScore = 0; // initialize score
var answeredCorrectly = 0; // initialize number of correctly answered questions. if answerCorrectly = number of questions, give bonus points.

var contentDiv = document.querySelector(".content");
var questionDiv = document.getElementById("question-content");
var multipleChoiceUL = document.getElementById("multiple-choices");

var formContainer = document.getElementById("form-content");
var userNameInput = document.getElementById("user-name-input");

var tableContainer = document.getElementById("table-content");
var table = document.querySelector("tbody");

var questionNumber = 0;
var timerIntertval;

var users = []; // array to store user objects {name: userName, score: userScore}

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
      timer.style.color = "red"; // change countdown to red if less than 10 seconds left
    }
    if (quizTimeLimit <= 0) {
      stopCountdown();
      quizTimeLimit = 0;
      clearList();
      displayTimesUp();
      setTimeout(displayUserScore, 1500);
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
  questionDiv.children[0].textContent = "$_";
  questionDiv.children[1].textContent = `QUESTION ${questionNumber + 1}: ${questionsList[questionNumber].question}`;
  questionDiv.children[1].style.color = "#00bfff";

  for (let j = 0; j < questionsList[questionNumber].choices.length; j++) {
    // create a list element for each choice available
    let liElement = document.createElement("li");
    multipleChoiceUL.appendChild(liElement);
    liElement.id = j; // set id for each li to index j

    let abcd = "ABCD";
    multipleChoiceUL.children[j].textContent = abcd[j] + ": " + questionsList[questionNumber].choices[j];
  }
}

// FUNCTION TO SHOW NEXT QUESTION
function displayNextQuestion() {
  questionNumber++;
  clearList(); // remove li nodes from previous question
  if (questionNumber < questionsList.length) {
    multipleChoiceUL.style.pointerEvents = "auto"; // enable clicks when next question is displayed
    displayQuestion();
  } else { 
    stopCountdown(); // if all the questions have been answered, stop countdown and display score
    displayUserScore();
  }
}

// FUNCTION TO SELECT FROM LIST OF MULTIPLE CHOICES
function selectAnswer(event) {
  let userAnswer = event.target.id; // get the id of the li tag the user clicks on

  // if user's answer is correct, change selection to neon green, add 10 points to score. After 1.5s display the next question
  if (userAnswer == questionsList[questionNumber].answer) { 
    multipleChoiceUL.children[userAnswer].textContent += " CORRECT!";
    multipleChoiceUL.children[userAnswer].style.color = "#39ff14";
    addScore();
    answeredCorrectly += 1;
    setTimeout(displayNextQuestion, 1500);
    // prevent additional clicks after answer has been selected
    multipleChoiceUL.style.pointerEvents = "none"; 
  // if user's answer is incorrect, change selection to red, subtract 5 seconds from time. After 1.5s display the next question
  } else {
    multipleChoiceUL.children[userAnswer].textContent += " INCORRECT";
    multipleChoiceUL.children[userAnswer].style.color = "red";
    substractTime();
    setTimeout(displayNextQuestion, 1500);
    // prevent additional clicks after answer has been selected
    multipleChoiceUL.style.pointerEvents = "none";
  }
}

// FUNCTION TO DISPLAY TIME'S UP
function displayTimesUp() {
  scoreRow.removeChild(scoreID);
  scoreRow.style.justifyContent = "center";
  timerID.style.fontSize = "36px";
  timerID.textContent = "TIME IS UP!";
  questionDiv.style.display = "none";
}

// FUNCTION TO DISPLAY FINAL userScore. If all answers are correct then give 50 bonus points. and ASK USER TO ENTER THEIR NAME
function displayUserScore() {
  scoreRow.style.display = "none";
  questionDiv.style.display = "none";
  formContainer.style.display = "block";
  saveScoreBtn.style.display = "block";

  if (answeredCorrectly === questionsList.length) {
    userScore += 50;
    formContainer.children[0].textContent = `You get 50 bonus points for answering all the questions correctly! You scored ${userScore} points`;
  } else {
    formContainer.children[0].textContent = `You scored ${userScore} points`;
  }
}

// FUNCTION TO SAVE SCORE TO LOCAL STORAGE
function saveScore(event) {
  event.preventDefault();
  let userName = userNameInput.value;
  if (userName === "") {
    userName = "anonymous";
  }

  let user = { name: userName, score: userScore };  
  users = users.concat(JSON.parse(localStorage.getItem("users"))); // get the stored array first
  users.push(user); // add latest entry to the users array
  localStorage.setItem("users", JSON.stringify(users)); // store the new users array that includes all the entries
  sortHighScores();
  displayHighScore();
}

// FUNCTION TO SORT THE users ARRAY FROM HIGH TO LOW SCORE
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

// FUNCTION TO DISPLAY HIGH SCORES
function displayHighScore() {
  formContainer.style.display = "none";
  saveScoreBtn.style.display = "none";
  tableContainer.style.display = "block"; 

  // create table row for each user in users array
  for (let i = 0; i < users.length; i++){ 
    let trElement = document.createElement("tr");
    table.appendChild(trElement);
    
    // create 2 table cells per table row
    for (let j = 0; j < 2; j++){
      let tdElement = document.createElement("td");
      trElement.appendChild(tdElement);
    }
    trElement.children[0].textContent = users[i].name;
    trElement.children[1].textContent = users[i].score;
  }
}

// FUNCTION TO ADD 10 points TO userScore
function addScore() {
  userScore += 10; 
  console.log(userScore);
  scoreID.textContent = "Score: " + userScore;
}

// FUNCTION TO SUBTRACT 5 seconds FROM quizTimeLimit
function substractTime() {
  quizTimeLimit -= 5;
}

// FUNCTION CLEAR LIST NODES
function clearList() {
  while (multipleChoiceUL.firstChild) {
    multipleChoiceUL.removeChild(multipleChoiceUL.firstChild);
  }
}

// EVENTLISTENERS
startBtn.addEventListener("click", startQuiz);
multipleChoiceUL.addEventListener("click", selectAnswer);
saveScoreBtn.addEventListener("click", saveScore);

// if Enter (return) key is pressed down in the form, it triggers the Save Score button
userNameInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    saveScoreBtn.click();
  }
});