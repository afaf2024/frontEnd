let question;
let assignedQuestion = 0;
let correctAnswer;
let score = 0;
let defaultImage =
        'https://as1.ftcdn.net/v2/jpg/01/34/02/24/1000_F_134022431_DCaIkrIQ2x0QV6qZpmhSaF5mc9I3YOkc.jpg';

function init() {
    fetch('https://erasmus.ieszaidinvergeles.es/fakeNews/public/api/quizimg')
    .then(response => response.json())
    .then(text => game(text));
}

function game(text) {
    
    document.getElementById('score').textContent = 'Score: ';
    
    showQuestion(text);

    //buttons
    document.getElementById('buttonTrue').addEventListener('click', () => {
        checkAnswer(1);
    });
    document.getElementById('buttonFalse').addEventListener('click', () => {
        checkAnswer(0);
    });

    document.getElementById('buttonNext').addEventListener('click', () => {
        nextQuestion(text);
    });

    //restart
    document.getElementById('buttonRestart').addEventListener('click', () => {
        document.getElementById('buttonRestart').style.display = 'none';
        assignedQuestion = 1;
        //showQuestion(text);
        document.getElementById('result').textContent = '';
        showButtons();
        score = 0;
        document.getElementById('score').textContent = 'Score: ' + score;
        init();
    });


}

//checkAnswer
function checkAnswer(buttonValidation) {
    hideButtons();
    if (question.correct === buttonValidation) {
        document.getElementById('result').textContent = 'Correct';
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
    } else {
        document.getElementById('result').textContent = 'Incorrect';
    }
    document.getElementById('explanation').textContent = question.realNew;
}

//hideButtons
function hideButtons() {
    document.getElementById('buttonTrue').style.display = 'none';
    document.getElementById('buttonFalse').style.display = 'none';
    document.getElementById('buttonNext').style.display = 'block';
}

//showButtons
function showButtons() {
    document.getElementById('buttonTrue').style.display = 'block';
    document.getElementById('buttonFalse').style.display = 'block';
    document.getElementById('buttonNext').style.display = 'none';
}

//nextQuestion
function nextQuestion(text) {
    assignedQuestion++;
    if (assignedQuestion >= text.questions.length) {
        document.getElementById('buttonRestart').style.display = 'block';
        document.getElementById('buttonNext').style.display = 'none';
    } else {
        showQuestion(text);
        document.getElementById('result').textContent = '';
        showButtons();
    }
}

function showQuestion(text) {
    question = text.questions[assignedQuestion];
    document.getElementById('testImage').src = question.img ? question.img : defaultImage;
    document.getElementById('testText').textContent = question.question;
}
window.onload = init();
