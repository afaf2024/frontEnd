let question;
let assignedQuestion = 0;
let correctAnswer;
let score = 0;

let currentLenguage = localStorage.getItem("lang"); //Saves the current Lenguage of the Website

let defaultImage =
    'https://as1.ftcdn.net/v2/jpg/01/34/02/24/1000_F_134022431_DCaIkrIQ2x0QV6qZpmhSaF5mc9I3YOkc.jpg';
const loader = document.getElementById("loader");
const image = document.getElementById("quizTestImage");

async function init () {
    const response = await fetch(`https://erasmus.ieszaidinvergeles.es/fakeNews/public/api/quizimg/${currentLenguage}`);
    const text = await response.json();
    game(text);
    await new Promise(r => setTimeout(r, 400));
    loader.style.display = "none";
    image.style.display = "block";
}



function game(text) {
    //test2
    showQuestion(text);

    //buttons
    document.getElementById('quizButtonTrue').addEventListener('click', () => {
        checkAnswer(1);
    });
    document.getElementById('quizButtonFalse').addEventListener('click', () => {
        checkAnswer(0);
    });

    document.getElementById('quizButtonNext').addEventListener('click', () => {
        nextQuestion(text);
    });

    //restart
    document.getElementById('quizButtonRestart').addEventListener('click', () => {
        document.getElementById('quizButtonRestart').style.display = 'none';
        location.reload();
    });


}

//checkAnswer
function checkAnswer(buttonValidation) {
    document.getElementById('quizExplanation').textContent = question.realNew;
    document.getElementById('quizExplanation').style.display = 'block';
    hideButtons();
    if (question.correct === buttonValidation) {
    // document.getElementById('quizResult').textContent = 'You Are Right!';
    document.getElementById('quizResult').innerHTML = `You are Right! <span class="material-symbols-outlined">check</span>`;
        score++;
        document.getElementById('quizScore').textContent = 'Score: ' + score;
        document.getElementById('quizScore').style.display = 'block';
    } else {
        // document.getElementById('quizResult').textContent = 'You Failed!';
        document.getElementById('quizResult').innerHTML = `You Failed! <span class="material-symbols-outlined" id="close">close</span>`;
    }
   
  
   
}

//hideButtons
function hideButtons() {
    document.getElementById('quizButtonTrue').style.display = 'none';
    document.getElementById('quizButtonFalse').style.display = 'none';
    document.getElementById('quizButtonNext').style.display = 'block';
}

//showButtons
function showButtons() {
    document.getElementById('quizButtonTrue').style.display = 'block';
    document.getElementById('quizButtonFalse').style.display = 'block';
    document.getElementById('quizButtonNext').style.display = 'none';
}

//nextQuestion
function nextQuestion(text) {
    assignedQuestion++;
    if (assignedQuestion >= text.questions.length) {
        document.getElementById('quizButtonRestart').style.display = 'block';
        document.getElementById('quizButtonNext').style.display = 'none';
        switch (currentLenguage) {
            case 'es':
                document.getElementById('quizResult').textContent = 'Has terminado de jugar! Quieres jugar de nuevo?';
            break;
            case 'en':
                document.getElementById('quizResult').textContent = 'You Finished the Game! Want to Play Again?';
            break;
            case 'it':
                document.getElementById('quizResult').textContent = 'Hai finito il gioco! Vuoi giocare di nuovo?';
            break;
            case 'de':
                document.getElementById('quizResult').textContent = 'Du hast das Spiel beendet! Möchtest du nochmal spielen?';
            default:
                document.getElementById('quizResult').textContent = 'You Finished the Game! Want to Play Again?';
        }
  
        
        document.getElementById('quizResult').textContent = 'You Finished the Game! Want to Play Again?';
    
        document.getElementById('quizExplanation').style.display = 'none';
    } else {
        showQuestion(text);
        document.getElementById('quizResult').textContent = '';
        document.getElementById('quizExplanation').textContent = '';
        showButtons();
    }
   
}

function showQuestion(text) {
    question = text.questions[assignedQuestion];
    document.getElementById('quizTestImage').src = question.img ? question.img : defaultImage;
    document.getElementById('quizTestText').textContent = question.question;
}


// function Scrolldown() {
//     window.location.hash = '#game-section';
// }

window.onload = init();
// window.onload = Scrolldown;

