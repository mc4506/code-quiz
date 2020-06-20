var startBtn = document.getElementById("start-btn");

var scoreRow = document.querySelector(".score-row");

var quizTimeLimit = 20; // Time limit in seconds
var timerID = document.getElementById("timer");

var scoreID = document.getElementById("score");
var userScore = 0; // initialize score
var correctAnswers = 0;

var contentDiv = document.querySelector(".content");
var multipleChoiceForm = document.querySelector(".multiple-choices");

// Function call to start quiz
startBtn.addEventListener("click", startQuiz);

// FUNCTION TO START QUIZ
function startQuiz() {
  scoreRow.style.display = "flex"; // Unhide score-row container
  startBtn.style.display = "none"; // hide start button
  contentDiv.style.display = "none";
  
  countdown();
  questionsLoop();
}

// FUNCTION TO LOOP THROUGH QUESTIONS
function questionsLoop(callback) {
  var x = 0;
  loop(x);
  function loop() {
if (x < 10) {
  displayQuestions(x++);
  userSelection(x++);
} else {
  callback();
}
  }
  
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
    }
    timerID.textContent = "Timer: " + quizTimeLimit + "s";
    quizTimeLimit -= 1;
  }, 1000);
}

// FUNCTION TO CREATE CONTENT div and MULTIPLE CHOICES form
function displayQuestions(questionNumber) {
  // questionsDiv.style.textAlign = "left";
  // questionsDiv.textContent = `Question ${questionNumber + 1}: ${questionsList[questionNumber].question}`;
  let pElement = document.createElement("p");
  multipleChoiceForm.appendChild(pElement);
  pElement.style.textAlign = "left";
  pElement.textContent = `Question ${questionNumber + 1}: ${questionsList[questionNumber].question}`;

  for (let i = 0; i < questionsList[questionNumber].choices.length; i++) {
    // create input element and label element for each choice available and append to form tag
    let inputElement = document.createElement("input");
    let labelElement = document.createElement("label");

    multipleChoiceForm.appendChild(inputElement);
    multipleChoiceForm.appendChild(labelElement);

    // use radio input type. Hide the radio buttons.
    inputElement.type = "radio";
    inputElement.name = "answer";
    inputElement.value = i;
    inputElement.id = i;
    inputElement.style.display = "none";

    // display each multiple choice selection using the label element
    let abcd = "ABCD";
    labelElement.htmlFor = i;
    labelElement.textContent = abcd[i] + ": " + questionsList[questionNumber].choices[i];
  }
}

function userSelection(questionNumber) {
  multipleChoiceForm.addEventListener("click", function (answer) {
    let userChoice = answer.target.value;

    console.log(userChoice);
    if (userChoice == questionsList[questionNumber].answer) {
      multipleChoiceForm.children[2 * userChoice + 2].textContent += " <== Correct!";
      multipleChoiceForm.children[2 * userChoice + 2].style.color = "green";
      addScore();
      setTimeout(clearFormNodes, 1500);
      return;
    } else {
      multipleChoiceForm.children[2 * userChoice + 2].textContent += " <== Incorrect";
      multipleChoiceForm.children[2 * userChoice + 2].style.color = "red";
      substractTime();
      setTimeout(clearFormNodes, 1500);
      return;
    }
  });
}

// FUNCTION TO ADD TO userScore
function addScore() {
  userScore += 10;
  scoreID.textContent = "Score: " + userScore;
}

// FUNCTION TO SUBTRACT 5 seconds from quizTimeLimit
function substractTime() {
  quizTimeLimit -= 5;
}

// FUNCTION TO CLEAR FORM CHILDNODES AFTER CHOICE HAS BEEN SELECTED
function clearFormNodes() {
  while (multipleChoiceForm.firstChild) {
    multipleChoiceForm.removeChild(multipleChoiceForm.firstChild);
  }
}
