// API address: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
// API docs address: https://opentdb.com/api_config.php
// -----------
// 
//
//Variables for HTML elements
let box1 = document.getElementById("Box1")
let box2 = document.getElementById("Box2")
let box3 = document.getElementById("Box3")
let box4 = document.getElementById("Box4")
let questionText = document.getElementById("question");
let questionNumber = document.getElementById("questionnumber");
let nextQuestionButton = document.querySelector("#Next");
let correctAnswerText = document.querySelector("#correctText");
let playerAnswerText = document.querySelector("#playerAnswer");
let scoreText = document.getElementById("score");

//Define variables for current question and score
let currentQuestion = 1;
let score = 0;

//Function to get API token
async function getToken() {
    let tokenresponse = await fetch("https://opentdb.com/api_token.php?command=request");
    dataToken = await tokenresponse.json();
}

// Function to get quiz data from API
async function getData() {
    category = document.querySelector("#category").value;
    difficulty = document.querySelector("#difficulty").value;
    numberOfQuestions = document.querySelector("#questionamount").value;
    apiURL = ("https://opentdb.com/api.php?type=multiple" + "&amount=" + numberOfQuestions + "&category=" + category + "&difficulty=" + difficulty + "&token=" + dataToken.token);
    let response = await fetch(apiURL);
    data = await response.json();
    getQuestions();
    ;
}

//Run initial start function that loads starting page
start();

//Function to show settings and hide quiz when user initially lands on page
function start() {
    document.getElementById("settings").style.display = "block";
    document.getElementById("restart").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("score").style.display = "none";
    getToken();
}

//Function to start a round of the game
function startGame(){
    category = document.querySelector("#category").value;
    difficulty = document.querySelector("#difficulty").value;
    document.getElementById("settings").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    currentQuestion = 1;
    score = 0;
    hideResult();
    getData();
    document.getElementById("quiz").style.display = "block";
    document.getElementById("restart").style.display = "block";
    showAnswerBoxes();
}

//Function to populate question and assign answers
function getQuestions() {    
    question = data.results[(currentQuestion - 1)].question
    correctAnswer = data.results[(currentQuestion - 1)].correct_answer;
    wrongAnswer1 = data.results[(currentQuestion - 1)].incorrect_answers[0];
    wrongAnswer2 = data.results[(currentQuestion - 1)].incorrect_answers[1];
    wrongAnswer3 = data.results[currentQuestion - 1].incorrect_answers[2];
    questionNumber.innerHTML = `Question ${currentQuestion}`;
    questionText.innerHTML = question;
    randomiser();}

// Function to randomise which box contains the correct answer and populate answers
function randomiser() {
    let randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 0.25){
        box1.innerHTML = correctAnswer;
        box2.innerHTML = wrongAnswer1;
        box3.innerHTML = wrongAnswer2;
        box4.innerHTML = wrongAnswer3;}

    if (randomNumber >= 0.25 && randomNumber < 0.50){
        box1.innerHTML = wrongAnswer1;
        box2.innerHTML = correctAnswer;
        box3.innerHTML = wrongAnswer2;
        box4.innerHTML = wrongAnswer3;}
    
    if (randomNumber >= 0.50 && randomNumber < 0.75){
        box1.innerHTML = wrongAnswer1;
        box2.innerHTML = wrongAnswer2;
        box3.innerHTML = correctAnswer;
        box4.innerHTML = wrongAnswer3;}
    
    if (randomNumber >= 0.75 && randomNumber <= 1){
        box1.innerHTML = wrongAnswer1;
        box2.innerHTML = wrongAnswer2;
        box3.innerHTML = wrongAnswer3;
        box4.innerHTML = correctAnswer;}
    }

//Function to show the answer boxes at the start of each round
function showAnswerBoxes () {
    box1.style.display = "block";
    box2.style.display = "block";
    box3.style.display = "block";
    box4.style.display = "block";
}

//Function to hide the answer boxes
function hideAnswerBoxes () {
    box1.style.display = "none";
    box2.style.display = "none";
    box3.style.display = "none";
    box4.style.display = "none";
}

//Function to handle the submission of the answer once player clicks on a box 
function submitAnswer(){
    hideAnswerBoxes();
    showAnswer();
    if (playerAnswer === correctAnswer) {
        playerAnswerText.innerText = `Correct!`;
        score++;
    } else {
        playerAnswerText.innerHTML = `Wrong. You chose ${playerAnswer}`;
    }
}

//Function to advance to next question
function nextQuestion(){
    currentQuestion++;
    if (currentQuestion > numberOfQuestions) {
        endGame();
    } else {
        getQuestions();
        hideResult();
        showAnswerBoxes();
    };
}

//Function to show the score at the end of the game and ask if another round is to be played
function endGame(){
    document.getElementById("quiz").style.display = "none";
    document.getElementById("restart").style.display = "none";
    scoreText.innerText = `End of quiz.\n\nYou scored ${score} out of ${numberOfQuestions}.`;
    document.getElementById("score").style.display = "block";
    setTimeout(() => {
        if (confirm("Would you like to play another round?") === true) {
            startGame();
    
        } else {
            start();
        }
    }, "2000")
}

//Function to restart game when player plays another round
function restartGame(){
    currentQuestion = 1;
    score = 0;
    hideResult();
    getToken();
    getData(); 
}

//Function to show the correct answer
function showAnswer () {
    correctAnswerText.innerHTML = `The answer is ${correctAnswer}`;
    correctAnswerText.style.display = "block";
    nextQuestionButton.style.display = "block";
    playerAnswerText.style.display = "block";
}

//Function to hide the result of each round
function hideResult () {
    nextQuestionButton.style.display = "none";
    correctAnswerText.style.display = "none";
    playerAnswerText.style.display = "none";}

//Listening for click on next question button
nextQuestionButton.addEventListener("click", nextQuestion);

//Listening for click on restart button
nextQuestionButton.addEventListener("restart", start);


//Listening for clicks on answer boxes
//Functions to assign playerAnswer based on button that's clicked
box1.addEventListener("click", function onClick() {
    playerAnswer = box1.innerHTML;
    submitAnswer();});
box2.addEventListener("click", function onClick() {
    playerAnswer = box2.innerHTML;
    submitAnswer();});
box3.addEventListener("click", function onClick() {
    playerAnswer = box3.innerHTML;
    submitAnswer();});
box4.addEventListener("click", function onClick() {
    playerAnswer = box4.innerHTML;
    submitAnswer();});
