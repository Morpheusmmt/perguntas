const question = document.getElementById("questao");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true; // Corrigido
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Quando e onde foi a primeira vez que conversamos?",
        choice1: "26/10/2024, pedras 2", // Adicionada vírgula
        choice2: "23/10/2024, passarela", // Adicionada vírgula
        choice3: "10/09/2023, pinheiro", // Adicionada vírgula
        choice4: "26/10/2023, pedras 1", // Adicionada vírgula
        answer: 1
    },
    {
        question: "O que aconteceu na escada do pinheiro?",
        choice1: "Maida caiu e Emily riu", // Adicionada vírgula
        choice2: "Maida e Emily conversaram sobre Chesterton", // Adicionada vírgula
        choice3: "Maida disse que ela era vermelha e Emily azul e que juntas formavam roxo", // Adicionada vírgula
        choice4: "Maida e Emily se olharam", // Adicionada vírgula
        answer: 3
    },
    {
        question: "Quais os primeiros livros que Maida deu pra Emily?",
        choice1: "Chesterton e natureza da mordida", // Adicionada vírgula
        choice2: "Manifesto Comunista e HQ do Miranha", // Adicionada vírgula
        choice3: "Tudo é rio e natureza da mordida", // Adicionada vírgula
        choice4: "Mulherzinhas e natureza da mordida", // Adicionada vírgula
        answer: 4
    }
];

// Constantes
const CORRETO_BONUS = 10;    
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => { // Corrigido
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) { // Corrigido
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./end.html");
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true; // Corrigido
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply === "correct") {
            incrementScore(CORRETO_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
