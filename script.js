// variables set
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// questions about the NBA teams
var quizQuestions = [{
    question: "What does NBA stand for?",
    choiceA: "No boys allowed",
    choiceB: "National Basketball Association",
    choiceC: "New basketball association",
    choiceD: "Netflix best adds",
    correctAnswer: "b"
},

{
    question: "Who won the first ever NBA championship?",
    choiceA: "Golden state worriors",
    choiceB: "Lakers",
    choiceC: "Chicago bulls",
    choiceD: "Boston Celtics",
    correctAnswer: "d"
},
{
    question: "Which NBA franchise has won the most championships?",
    choiceA: "Chicago bulls",
    choiceB: "Denver nuggets",
    choiceC: "Boston celtics",
    choiceD: "Portland Trail blazers",
    correctAnswer: "c"
},
{
    question: "What NBA team did Micheal Jordan play for?",
    choiceA: "Sixers",
    choiceB: "Miami Heat",
    choiceC: "Dallas mavericks",
    choiceD: "chicago Bulls",
    correctAnswer: "d"
},
{
    question: "What NBA team does Stephen Curry play for?",
    choiceA: "Raptors",
    choiceB: "Golden state warriors",
    choiceC: "San Antonio Spurs",
    choiceD: "Houston rockets",
    correctAnswer: "b"
},

];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 30;
var timerInterval;
var score = 0;
var correct;

//  generate questions and answers.
function generateQuizQuestion() {
    gameoverDiv.style.display = "game over";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }

    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//  first quiz question.
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// dispaly score 
function showScore() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// submit score
submitScoreBtn.addEventListener("click", function highscore() {

// initials cant be empty alert
    if (highscoreInputName.value === "") {
        alert("enter desired initials");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// display high scores 
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}


function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// reset the quiz
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 30;
    score = 0;
    currentQuestionIndex = 0;
}

// verify the answer to see if its correct
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("!Great! U GOT IT.");
        currentQuestionIndex++;
        generateQuizQuestion();

       
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {

        alert("Ooops, sorry try again.")
        startTime -= 5;
        currentQuestionIndex++;
        generateQuizQuestion();
     
    } else {
        
        showScore();
    }
}

// start quiz
startQuizButton.addEventListener("click", startQuiz);