// list of quiz questions taken from various quizzes from W3Schools.com

var questionsList = [
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    answer: 0,
  },
  {
    question: "What is the correct HTML for adding a background color?",
    choices: ['<body style="background - color: yellow;">', "<background>yellow</background>", '<body bg="yellow">'],
    answer: 0,
  },
  {
    question: "How can you open a link in a new tab/browser window?",
    choices: ['<a href="url" target="new">', '<a href="url" new', '<a href="url" target="_blank"'],
    answer: 2,
  },
  {
    question: "Inline elements are normally displayed without starting a new line.",
    choices: ["True", "False"],
    answer: 0,
  },
  {
    question: "How can you make a numbered list?",
    choices: ["<list>", "<ul>", "<ol>", "<dl>"],
    answer: 2,
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    choices: ["src", "title", "longdesc", "alt"],
    answer: 3,
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<script>", "<scripting>", "<javascript>"],
    answer: 1,
  },
  {
    question: 'What is the correct JavaScript syntax to change the content of the HTML element below? \n <p id="demo">This is a demonstration.</p>',
    choices: ["#demo.innerHTML = 'Hello World!';", 'document.getElementById("demo").innerHTML = "Hello World!";', 'document.getElementByName("p").innerHTML = "Hello World!";', 'document.getElement("p").innerHTML = "Hello World!";'],
    answer: 1,
  },
  {
    question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    choices: ["if (i != 5)", "if i =! 5 then", "if (i <> 5)", "if i <> 5"],
    answer: 0,
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    choices: ["fgcolor", "color", "font-color", "text-color"],
    answer: 1,
  },
];