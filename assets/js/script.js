var startBtn = document.getElementById("start-btn");
var nextBtn = document.getElementById("next-btn");

var scoreRow = document.querySelector(".score-row");
var buttonRow = document.querySelector(".button-row");

var quizTimeLimit = 15; // Time limit in seconds
var timerID = document.getElementById("timer");

var scoreID = document.getElementById("score");
var userScore = 0; // initialize score
var answeredCorrectly = 0; // initialize number of correctly answered questions

var contentDiv = document.querySelector(".content");
var questionDiv = document.getElementById("question-content");
var multipleChoiceUL = document.getElementById("multiple-choices");

var questionNumber = 0;

// Function call to start quiz
startBtn.addEventListener("click", startQuiz);

// FUNCTION TO START QUIZ
function startQuiz() {
  scoreRow.style.display = "flex"; // Unhide score-row container
  startBtn.style.display = "none"; // hide start button
  contentDiv.style.display = "none";

  countdown();

  // display first question after Start button is clicked
  displayQuestion();
  userSelection();

  // display remaining questions after Next button is clicked
  nextBtn.addEventListener("click", function () {
    questionNumber++;
    clearList();
    if (questionNumber < questionsList.length) {
      displayQuestion();
      userSelection();
    }else {
      console.log("qNumber3:" + questionNumber);
      displayUserScore();
    }
  });
}

// FUNCTION FOR TIMER COUNTDOWN
function countdown() {
  var timerIntertval = setInterval(function () {
    if (quizTimeLimit <= 10) {
      timer.style.color = "red";
    }
    if (quizTimeLimit <= 0) {
      clearInterval(timerIntertval);
      quizTimeLimit = 0;
      clearList();
      displayTimesUp();
      setTimeout(displayUserScore, 1000);
      return;
    }
    quizTimeLimit -= 1;
    timerID.textContent = "Timer: " + quizTimeLimit + "s";
  }, 1000);
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

// FUNCTION TO SHOW QUESTION AND CREATE li TAGS TO SHOW MULTIPLE CHOICES
function displayQuestion() {
  // console.log(content.children[0]);
  // console.log(questionsList[0].question);
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

// FUNCTION TO SELECT FROM LIST OF MULTIPLE CHOICES
function userSelection() {
  multipleChoiceUL.addEventListener("click", function (event) {
    // stopImmediatePropagation prevents the Eventlistner from firing multiple times on a single click.
    event.stopImmediatePropagation();

    let userChoice = event.target.id;
    console.log(userChoice);
    if (userChoice == questionsList[questionNumber].answer) {
      multipleChoiceUL.children[userChoice].textContent += " <== Correct!";
      multipleChoiceUL.children[userChoice].style.color = "green";
      addScore();
      answeredCorrectly += 1;
      buttonRow.style.display = "flex";
    } else {
      multipleChoiceUL.children[userChoice].textContent += " <== Incorrect";
      multipleChoiceUL.children[userChoice].style.color = "red";
      substractTime();
      buttonRow.style.display = "flex";
    }
  });
}

// FUNCTION TO DISPLAY userSore, answeredCorrectly, and ASK USER TO ENTER THEIR NAME
function displayUserScore() {
  scoreRow.style.display = "none";
  buttonRow.style.display = "none";
  questionDiv.children[0].textContent = `You scored ${userScore} points`;
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
