var startBtn = document.getElementById("start-btn");

var scoreRow = document.querySelector(".score-row");

var quizTimeLimit = 15; // Time limit in seconds
var timerID = document.getElementById("timer");

var scoreID = document.getElementById("score");
var userScore = 0; // initialize score

var questionsDiv = document.querySelector(".content");
var choicesForm = document.querySelector(".multiple-choices");

// Function call to start quiz
startBtn.addEventListener("click", startQuiz);

// FUNCTION TO START QUIZ
function startQuiz() {
  scoreRow.style.display = "flex"; // Unhide score-row container
  startBtn.style.display = "none"; // hide start button
  showQuestionsAndChoices();
  countdown();
}

// FUNCTION FOR TIMER COUNTDOWN
function countdown() {
  var timerIntertval = setInterval(function () {
    quizTimeLimit -= 1;
    timerID.textContent = "Timer: " + quizTimeLimit + "s";

    if (quizTimeLimit <= 10) {
      timer.style.color = "red";
    }
    if (quizTimeLimit === 0) {
      clearInterval(timerIntertval);
    }
  }, 1000);
}

// FUNCTION TO CHANGE CONTENT div and MULTIPLE CHOICES form
function showQuestionsAndChoices() {
  let i = 0;
  questionsDiv.style.textAlign = 'left';
  questionsDiv.textContent = `Question ${i + 1}: ${questionsList[i].question}`;
  

  for (let j = 0; j < questionsList[i].choices.length; j++) {
    // create input element and label element for each choice available and append to form tag
    let inputElement = document.createElement("input");
    let labelElement = document.createElement("label");
    choicesForm.appendChild(inputElement);
    choicesForm.appendChild(labelElement);
    
    // use radio input type. Hide the radio buttons.
    inputElement.type = "radio";
    inputElement.name = "answer";
    inputElement.value = j;
    inputElement.id = j;
    inputElement.style.display = "none";

    // display each multiple choice selection using the label element
    let abcd = "ABCD"; 
    labelElement.htmlFor = j;
    labelElement.textContent = abcd[j] + ": " + questionsList[i].choices[j];
  }
}
