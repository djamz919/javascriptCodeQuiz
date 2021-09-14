var headerEl = document.querySelector(".head");
var mainEl = document.querySelector("#main");

var score = 0;
var timeLeft = 89;
var questionNum = 0;
var highScores = []; //will hold objects of high scores

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
        question: "Which of the following are not one of the primitive data types in JavaScript?",
        choices: ["String", "Boolean", "Number", "Char"] //Index 3 is answer
    },
    {
        question: 'Which of the following options is not a way to increment a variable "i" by one?',
        choices: ["i++", "i+=1", "i=i+1", "i++1"] //Index 3 
    },
    {
        question: 'The range to "Math.floor(Math.random() *4) + 1" is from ________.',
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

var landingPage = function () {
    timeLeft = 89;
    questionNum = 0;
    score = 0;

    if (document.querySelector(".highscoreContainer") !== null) {
        var highScoreContainerEl = document.querySelector(".highscoreContainer");
        highScoreContainerEl.remove();
    }

    var viewScoresEl = document.createElement("p");
    viewScoresEl.id = "viewHS";
    viewScoresEl.textContent = "View high scores";
    headerEl.appendChild(viewScoresEl);

    var countdownEl = document.createElement("p");
    countdownEl.id = "timer";
    countdownEl.innerHTML = 'Time: <span id="timeLeft">0</span>';
    headerEl.appendChild(countdownEl);

    var wrapperEl = document.createElement("section");
    wrapperEl.id = "wrapper";
    mainEl.appendChild(wrapperEl);

    var mainContainerEl = document.createElement("div");
    mainContainerEl.id = "main-container";
    wrapperEl.appendChild(mainContainerEl);

    var landingHeaderEl = document.createElement("h1");
    landingHeaderEl.className = "headers";
    landingHeaderEl.id = "introHeader";
    landingHeaderEl.textContent = "JavaScript Coding Quiz";
    mainContainerEl.appendChild(landingHeaderEl);

    var questionHeaderEl = document.createElement("h1");
    questionHeaderEl.className = "question";
    mainContainerEl.appendChild(questionHeaderEl);

    var containerEl = document.createElement("div");
    containerEl.id = "container";
    mainContainerEl.appendChild(containerEl);

    var instrunctionWrapperEl = document.createElement("div");
    instrunctionWrapperEl.className = "instruction-wrapper";
    containerEl.appendChild(instrunctionWrapperEl);

    var instruction1El = document.createElement("p");
    instruction1El.className = "instructions"
    instruction1El.textContent = "Try to answer the following JavaScript related questions within the time limit."
    instrunctionWrapperEl.appendChild(instruction1El);

    var instruction2El = document.createElement("p");
    instruction2El.className = "instructions"
    instruction2El.textContent = "For each question you get correct, 10 points will be added to your score."
    instrunctionWrapperEl.appendChild(instruction2El);

    var instruction3El = document.createElement("p");
    instruction3El.className = "instructions"
    instruction3El.textContent = "Any remaining time at the end will also be added to your score."
    instrunctionWrapperEl.appendChild(instruction3El);

    var instruction4El = document.createElement("p");
    instruction4El.className = "instructions"
    instruction4El.textContent = "However, incorrect answers will penalize your time by 10 seconds!"
    instrunctionWrapperEl.appendChild(instruction4El);

    var mpcDivEl = document.createElement("div");
    mpcDivEl.id = "mpc";
    containerEl.appendChild(mpcDivEl);

    var btnWrappreEl = document.createElement("div");
    btnWrappreEl.className = "btn-wrapper";
    mainEl.appendChild(btnWrappreEl);

    var startButton = document.createElement("button");
    startButton.className = "startbutton";
    startButton.textContent = "Start Quiz";
    btnWrappreEl.appendChild(startButton);

    mpcDivEl.addEventListener("click", chooseOption);
    startButton.addEventListener("click", startQuiz);
    viewScoresEl.addEventListener("click", viewHS);
}

var countdown = function () {
    var timerEl = document.querySelector("#timeLeft");
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
    var introHeaderEl = document.querySelector("#introHeader");
    introHeaderEl.remove();
    var instrunctionWrapperEl = document.querySelector(".instruction-wrapper");
    instrunctionWrapperEl.remove();
    var startButtonEl = document.querySelector(".startbutton");
    startButtonEl.remove();
    displayQuestions(questionNum);
}

var displayQuestions = function (i) {
    var questionsEl = document.querySelector(".question");
    var mpcEl = document.querySelector("#mpc");

    questionsEl.textContent = questions[i].question;
    questionsEl.className = "question";

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
    var timerEl = document.querySelector("#timeLeft");
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
        if (questionNum === 10 || timerEl === 0) {
            setInterval(function () { result.remove(); }, 5000);
        }

    } else {
        timeLeft = timeLeft - 10;
        var result = document.createElement("p");
        result.className = "result";
        result.textContent = "Wrong!";
        mainEl.appendChild(result);
        questionNum++;
        if (questionNum === 10 || timerEl === 0) {
            setInterval(function () { result.remove(); }, 5000);
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
    var mainContainerEl = document.querySelector("#main-container");
    mainContainerEl.remove();
    var endContainer = document.createElement("div");
    endContainer.className = "endContainer"

    var wrapperEl = document.querySelector("#wrapper");
    wrapperEl.appendChild(endContainer);

    var allDoneHeader = document.createElement("h1");
    allDoneHeader.className = "allDone";
    allDoneHeader.textContent = "All Done!";
    endContainer.appendChild(allDoneHeader);

    var displayScore = document.createElement("p");
    displayScore.className = "text";
    displayScore.textContent = "Your final score is " + score + ".";
    endContainer.appendChild(displayScore);

    var formEl = document.createElement("form");
    formEl.className = "initialsForm"
    endContainer.appendChild(formEl);

    var formLabel = document.createElement("p");
    formLabel.className = "formLabel";
    formLabel.textContent = "Enter Initials: ";
    formEl.appendChild(formLabel);

    var formInput = document.createElement("input");
    formEl.appendChild(formInput);

    var formSubmit = document.createElement("button");
    formSubmit.className = "formSubmit";
    formSubmit.textContent = "Submit";
    formEl.appendChild(formSubmit);

    formEl.addEventListener("submit", addHS);
}

var clearHS = function () {
    var savedScores = localStorage.getItem("highScores");
    if (savedScores) {
        var highscoreContainerEl = document.querySelector(".highscoreContainer");
        highscoreContainerEl.remove();
        var emptyArray = [];
        localStorage.setItem("highScores", emptyArray);
    } else {
        return false;
    }
    viewHS();
}

var viewHS = function () {
    console.log("You want to view high scores?");
    timeLeft = 0;
    if (document.querySelector("#viewHS") !== null) {
        var viewScoresEl = document.querySelector("#viewHS");
        viewScoresEl.remove();
    }

    if (document.querySelector("#wrapper") !== null) {
        var wrapperEl = document.querySelector("#wrapper");
        wrapperEl.remove();
    }

    if (document.querySelector(".startbutton") !== null) {
        var startButtonEl = document.querySelector(".startbutton");
        startButtonEl.remove();
    }

    if (document.querySelector("#timer") !== null) {
        var countdownEl = document.querySelector("#timer");
        countdownEl.remove();
    }

    if (document.querySelector(".result") !== null) {
        var resultEl = document.querySelector(".result");
        resultEl.remove();
    }

    var highscoreContainerEl = document.createElement("div");
    highscoreContainerEl.className = "highscoreContainer";
    mainEl.appendChild(highscoreContainerEl);

    var highscoreHeaderEl = document.createElement("h1");
    highscoreHeaderEl.className = "headers";
    highscoreHeaderEl.textContent = "High Scores:";
    highscoreContainerEl.appendChild(highscoreHeaderEl);

    var scoreListEl = document.createElement("ul");
    scoreListEl.className = "scoreList";
    highscoreContainerEl.appendChild(scoreListEl);

    var savedScores = localStorage.getItem("highScores");
    if (savedScores) {
        console.log("Saved highs scores found!");
        savedScores = JSON.parse(savedScores);
        console.log(savedScores);
        for (var i = 0; i < savedScores.length; i++) {
            var scoreEl = document.createElement("li")
            scoreEl.className = "score";
            scoreEl.textContent = savedScores[i].name + " " + savedScores[i].highScore;
            scoreListEl.appendChild(scoreEl);
            console.log(scoreEl);
        }
    }

    var hsButtonDivEl = document.createElement("div");
    hsButtonDivEl.id = "hsButtonDiv";
    highscoreContainerEl.appendChild(hsButtonDivEl);

    var goBackButtonEl = document.createElement("button");
    goBackButtonEl.className = "btn";
    goBackButtonEl.textContent = "Go Back";
    hsButtonDivEl.appendChild(goBackButtonEl);

    var clearHSButtonEl = document.createElement("button");
    clearHSButtonEl.className = "btn";
    clearHSButtonEl.textContent = "Clear High Scores";
    hsButtonDivEl.appendChild(clearHSButtonEl);

    goBackButtonEl.addEventListener("click", landingPage);
    clearHSButtonEl.addEventListener("click", clearHS);

}

var addHS = function (event) {
    event.preventDefault();
    console.log("Am I trying to add a highscore?");
    var initialsHS = document.querySelector("input").value;

    var updatedScores = [];

    var highScoreObj = {
        name: initialsHS,
        highScore: score,
    };

    var savedScores = localStorage.getItem("highScores");
    if (savedScores) {
        savedScores = JSON.parse(savedScores);
        console.log(savedScores);
        for (var i = 0; i < savedScores.length; i++) {
            updatedScores.push(savedScores[i]);
        }
    }

    updatedScores.push(highScoreObj);

    highScores = updatedScores;

    localStorage.setItem("highScores", JSON.stringify(highScores));
    viewHS();
}

landingPage();