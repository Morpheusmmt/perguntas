const questiion = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice=text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnsewrs = true;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "Quando e onde foi a primeira vez que conversamos?",
        choice1: "26/10/2024, pedras 2"
        choice2: "23/10/2024, passarela"
        choice3: "10/09/2023, pinheiro "
        choice4: "26/10/2023, pedras 1"
        answer: 1
},
{     question: "O que aconteceu na escada do pinheiro?",
        choice1: "Maida caiu e emily riu"
        choice2: "Maida e emiy conversaram sobre chersterton"
        choice3: "Maida disse que ela era vermelha e emily azul e que juntas formavam roxo"
        choice4: "Maida e emily se olharam"
        answer: 3
},
{question: "Quais os primeiros livros que maida deu pra emily?",
        choice1: "Chersterton e natureza da mordida"
        choice2: "Manifesto comunista e hq do miranha"
        choice3: "Tudo é rio e natureza da mordida"
        choice4: "Mulherzinhas e natureza da mordida"
        answer: 4
}];

//constyans
const CORRETO_BONUS = 10;    
const MAX_QUESTIONS = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    console.log(availableQuesions);
    getNewQuestion();
}
getNewQuestion; = () =>{
    if(availableQuesions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./end.html");
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
choices.forEach(choice =>{
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
    

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply === "correct"){
            incrementScore(CORRETO_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}
startGame();
