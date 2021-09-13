var mainEl = document.querySelector("#main");
var startButtonEl = document.querySelector("#startQuiz");
var headersEl = document.querySelector(".headers");
var containerEl = document.querySelector("#container");
var instructionsEl = document.querySelector(".instructions");
var instrunctionWrapperEl = document.querySelector("#instruction-wrapper");
var timerEl = document.querySelector("#timeLeft");
var mpcEl = document.querySelector("#mpc");
var mainContainerEl = document.querySelector("#main-container");
var viewScoresEl = document.querySelector("#viewHS");
var wrapperEl = document.querySelector("#wrapper");

var score = 0;
var questionNum = 0;
var timeLeft = 89;

var questions = [
    {
        question: "Which of the following is not a loop in JavaScript?",
        choices: ["while", "do...while", "switch", "for"] //index 2 is answer
    },
    {
        question: "Which of the following code prints to the console?",
        choices: ["console.log()", "console.print()", "System.out.print()", "System.out.println()"] //index 0 is answer
    },
    {
        question: "Which of the following are not JavaScript types?",
        choices: ["String", "Boolean", "Number", "Char"] //Index 3 is answer
    },
    {
        question: 'Which of the following options is not a way to increment a variable "i" by one?',
        choices: ["i++", "i+=1", "i=i+1", "i++1"] //Index 3 
    },
    {
        question: 'What is the range of numbers for the following code?\nMath.floor(Math.random() *4) + 1',
        choices: ["0 to 4", "1 to 4", "0 to 5", "1 to 5"] //Index 1 is answer
    },
    {
        question: 'What is added to a loop or switch case to end the loop or exit the switch case?',
        choices: ["return null", "break", "stop", "end"] //Index 1 is answer
    },
    {
        question: 'The first item in an array has an index of ________.',
        choices: ["0", "1", "2", "3"] //Index 0 is answer
    },
    {
        question: 'To break apart a String "str" containing a sentence into an array of individual words, which of the following methods can be used?',
        choices: ["str.separate(' ')", "str.break(' ')", "str.split(' ')", "str.cut(' ')"] //Index 2 is answer
    },
    {
        question: "Which of the following window Web API methods requires a user's response?",
        choices: ["Window.print()", "Window.alert()", "Window.open()", "Window.prompt()"] //Index 3 is answer
    },
    {
        question: 'The expression "10 % 3" yields ________.',
        choices: ["1", "1/3", "3", "3 1/3"] //Index 0 is answer
    }
];

var answers = [2, 0, 3, 3, 1, 1, 0, 2, 3, 0];


var countdown = function () {
    timerEl.textContent = 90;

    var timeInterval = setInterval(function () {
        if (timeLeft > 0 && questionNum < 10) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft > 0 && questionNum === 10) {
            timerEl.textContent = "0"
            score = score + timeLeft;
            clearInterval(timeInterval);
            endQuiz();
        } else {
            timerEl.textContent = "0"
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

var startQuiz = function () {
    countdown();
    instrunctionWrapperEl.remove();
    startButtonEl.remove();
    displayQuestions(questionNum);
}

var displayQuestions = function (i) {
    headersEl.textContent = questions[i].question;
    headersEl.className = "question";

    var option1 = document.createElement("button");
    option1.className = "choice1";
    option1.setAttribute("data-choice-num", 0);
    option1.textContent = questions[i].choices[0];
    mpcEl.appendChild(option1);

    var option2 = document.createElement("button");
    option2.className = "choice2";
    option2.setAttribute("data-choice-num", 1);
    option2.textContent = questions[i].choices[1];
    mpcEl.appendChild(option2);

    var option3 = document.createElement("button");
    option3.className = "choice3";
    option3.setAttribute("data-choice-num", 2);
    option3.textContent = questions[i].choices[2];
    mpcEl.appendChild(option3);

    var option4 = document.createElement("button");
    option4.className = "choice4";
    option4.setAttribute("data-choice-num", 3);
    option4.textContent = questions[i].choices[3];
    mpcEl.appendChild(option4);
}

var chooseOption = function (event) {
    if (questionNum > 0) {
        var result = document.querySelector(".result");
        result.remove();
    }
    var targetEl = event.target;
    var choiceNum = targetEl.getAttribute("data-choice-num");
    if (choiceNum == answers[questionNum]) {
        var result = document.createElement("p");
        result.className = "result";
        result.textContent = "Correct!";
        mainEl.appendChild(result);
        questionNum++;
        score = score + 10;
        if (questionNum === 10) {
            setInterval(function () { result.remove(); }, 2000);
        }

    } else {
        timeLeft = timeLeft - 10;
        var result = document.createElement("p");
        result.className = "result";
        result.textContent = "Wrong!";
        mainEl.appendChild(result);
        questionNum++;
        if (questionNum === 10) {
            setInterval(function () { result.remove(); }, 2000);
        }
    }

    if (questionNum < 10) {
        displayQuestions(questionNum);
        clearOptions();
    }
}

var clearOptions = function () {
    var choice1 = document.querySelector(".choice1");
    var choice2 = document.querySelector(".choice2");
    var choice3 = document.querySelector(".choice3");
    var choice4 = document.querySelector(".choice4");
    choice1.remove();
    choice2.remove();
    choice3.remove();
    choice4.remove();
}

var endQuiz = function () {
    mainContainerEl.remove();
    var endContainer = document.createElement("div");
    endContainer.className = "endContainer"
    wrapperEl.appendChild(endContainer);

    var allDoneHeader = document.createElement("h1");
    allDoneHeader.className = "headers";
    allDoneHeader.textContent = "All Done!";
    endContainer.appendChild(allDoneHeader);

    var displayScore = document.createElement("p");
    displayScore.className = "text";
    displayScore.textContent = "Your final score is " + score + ".";
    endContainer.appendChild(displayScore);

    var formDiv = document.createElement("div");
    formDiv.className = "initialsForm"
    endContainer.appendChild(formDiv);

    var formLabel = document.createElement("p");
    formLabel.className = "formLabel";
    formLabel.textContent = "Enter Initials: ";
    formDiv.appendChild(formLabel);

    var formInput = document.createElement("input");
    formDiv.appendChild(formInput);

    var formSubmit = document.createElement("button");
    formSubmit.className = "formSubmit";
    formSubmit.textContent = "Submit";
    formDiv.appendChild(formSubmit);
}

var viewHS = function () {
    console.log("You want to view high scores?");
}

startButtonEl.addEventListener("click", startQuiz);

mpcEl.addEventListener("click", chooseOption);

viewScoresEl.addEventListener("click", viewHS);
