var startBtn = document.getElementById("start-btn");

var scoreRow = document.querySelector(".score-row");

var quizTimeLimit = 15; // Time limit in seconds
var timerID = document.getElementById("timer");

var scoreID = document.getElementById("score");
var userScore = 0; // initialize score

var questionsDiv = document.querySelector(".content");
var choicesUL = document.getElementById("multiple-choices");

// Function call to start quiz
startBtn.addEventListener("click", startQuiz);

// FUNCTION TO START QUIZ
function startQuiz() {
  scoreRow.style.display = 'flex'; // Unhide score-row container
  startBtn.style.display = 'none'; // hide start button
  showQuestions();
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

// FUNCTION TO CHANGE CONTENT
function showQuestions() {
  // console.log(content.children[0]);
  // console.log(questionsList[0].question);
  let i = 0;
  questionsDiv.style.textAlign = 'left';
  questionsDiv.textContent = `Question ${i + 1}: ${questionsList[i].question}`;
  

  for (let j = 0; j < questionsList[i].choices.length; j++) {
    // create a list element for each choice available
    let liElement = document.createElement("li");
    choicesUL.appendChild(liElement);
    
    let abcd = 'ABCD' 
    choicesUL.children[j].textContent = abcd[j] + ": " + questionsList[i].choices[j];
  }
}
