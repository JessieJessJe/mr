
const question = document.getElementById("question");
const imageQuestion = document.getElementById("image-question");
const choices = Array.from(document.getElementsByClassName("choice-text"))

console.log(choices[0]);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        id:1,
        question: 'Imagine if you were a young man living in Manhattan back in the 1950s — in fall 1956, what was the most anticipated event in town?',
        choice1: 'A baseball competition',
        choice2: 'A broadway show',
        choice3: 'A vote',
        hint1: 'baseball',
        hint2: 'musical',
        hint3: 'president',
        answer: 3,
    },
    {   id:2,
        question:"You were the same young man - in fall 1956, which brand's beer that you drank the most?",
        choice1: "Budweiser",
        choice2: "Rheingold",
        choice3: "Schlitz", 
        hint1: "Budweiser",
        hint2: "Rheingold",
        hint3: "Schlitz", 
        answer: 2,
    },
    {   id:3,
        question: "You saw this photo - please select the phrase that best describe the ladies in the photo",
        choice1: "college graduates",
        choice2: "beauty pageant hopefuls",
        choice3: "bridesmaids",
        answer: 2,
    },
    {   id:4,
        question: "Please select the phrase that best describe the ladies in the photo",
        choice1: "college graduates",
        choice2: "beer ads models",
        choice3: "bridesmaids",
        answer: 2,
    },
    {   id:5,
        question: "Remember this cartoon from The New Yorker in a 1957 issue? What was the caption?",
        choice1: "It started when one of them said that Adlai Stevenson II would be elected as the president",
        choice2: "It started when one of them said that all the Miss Rheingold candidates looked alike",
        choice3: "It started when one of them said that the Yankees would won the game",
        answer: 2,
    },
    {   id:6,
        question: "So, did you vote for Miss Rheingold?",
        choice1: "* Vote early, vote often, and vote inebriated*",
        choice2: "Of course, I was among the 23 million votes casted in 1956!",
        choice3: "♪ My beer is Rheingold the dry beer ♪",
        answer: 2,
    },
    {   id:7,
        question: "Woo-hoo! Why we all love Miss Rheingold?",
        choice1: "Her colored photograph",
        choice2: "Her family of origin",
        choice3: "Her social status",
        answer: 1,
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;
const HINT = [1,2];

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions]; //spead operator ?? to get a full copy
    getNewQuestion();
};


getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('https://JessieJessJe.github.io/mr/end.html');}

    questionCounter++;
    //const questionIndex = Math.floor(Math.random() * availableQuesions.length);

    const questionIndex = questionCounter-1;

    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        });
    
    imageQuestion.src="assets/q" + questionCounter + ".png";
    //availableQuesions.splice(questionIndex, 1); //bc question already used
    acceptingAnswers = true;
    };

// when chose the wrong answer
repeatQuestion = () => {
    
    console.log("wrong!")
    const questionIndex = questionCounter-1;

    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        });

    //availableQuesions.splice(questionIndex, 1); //bc question already used
    acceptingAnswers = true;
}

// wrongAnswerAlert = (e,index) => {
//     e.innerHTML = '<p>Try Again!</p>';
//     console.log(index);
//     setTimeout(repeatQuestion(), 1000*(index+1));
// }

choices.forEach((choice) => {

    choice.addEventListener('mouseover', (e) => {
        if (HINT.includes(questionCounter)){
            const selectedChoice = e.target;
            const number = selectedChoice.dataset['number'];
    
            hintName = currentQuestion['hint' + number];
            imageQuestion.src="./assets/" + hintName + ".png";
        }

    })

    choice.addEventListener('mouseleave', (e) => {
        if (HINT.includes(questionCounter)){
            console.log(HINT.includes(questionCounter))
            imageQuestion.src="./assets/q" + questionCounter + ".png";
        
        }
    })

    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) {console.log('alert'); return};

        acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            // selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if(selectedAnswer == currentQuestion.answer){
                
                getNewQuestion()}
            else {
                const classToApply = "incorrect";
                //wrong effect
                // wrongAnswerAlert(e.target,index);
                
                // not working: setTimeout(repeatQuestion(),2000)

                selectedChoice.parentElement.classList.add(classToApply);
                imageQuestion.src="./assets/wrongAnswer.png";

                setTimeout(() => {
                imageQuestion.src="./assets/q" + questionCounter + ".png";
                selectedChoice.parentElement.classList.remove(classToApply);
                repeatQuestion();
                }, 1000);
 
            }
        });
});

startGame();