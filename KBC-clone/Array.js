const question = document.getElementById('question-text')
const option1 = document.getElementById('option-1')
const option2 = document.getElementById('option-2')
const option3 = document.getElementById('option-3')
const option4 = document.getElementById('option-4')
const name = document.getElementById('name')
const greenDotContainer = document.getElementById('green-dot-container');
const greenDotClass = 'green-dot';
const prizeContainer = document.getElementById('price-container');
const timerContainer = document.getElementById('timer-container');
const timerCountElement = document.getElementById('timer-count');
let currentQuestionIndex = 1;
let timer ;
let timerSeconds = 300; 
let isQuestionCorrect = false;
var myAudio = document.getElementById("myAudio");
let hintCount;
const hintContainer = document.getElementById('hint-container')



kbc_questions = {
    "q1": {
        "question": "What is the capital of India?",
        "options": ["A. Mumbai", "B. Delhi", "C. Kolkata", "D. Chennai"],
        "hint" : "It's a city that serves as the seat of all three branches of the Government of India",
        "correct_answer": "B. Delhi",
        "correct":false
    },
    "q2": {
        "question": "Who is known as the 'Father of the Nation' in India?",
        "options": ["A. Jawaharlal Nehru", "B. Sardar Patel", "C. Mahatma Gandhi", "D. Subhas Chandra Bose"],
        "correct_answer": "C. Mahatma Gandhi",
        "hint" : " He led India to independence through non-violent civil disobedience and is celebrated on October 2nd each year",
        "correct":false
    },
    "q3": {
        "question": "Which planet is known as the 'Red Planet'?",
        "options": ["A. Venus", "B. Mars", "C. Jupiter", "D. Saturn"],
        "correct_answer": "B. Mars",
        "hint" : "It's the fourth planet from the Sun and has a reddish appearance due to iron oxide on its surface.",
        "correct":false
    },
    "q4": {
        "question": "What is the largest mammal on Earth?",
        "options": ["A. Elephant", "B. Blue Whale", "C. Giraffe", "D. Gorilla"],
        "correct_answer": "B. Blue Whale",
        "hint" : "This marine mammal can reach lengths of up to 100 feet and is known for its distinctive blue-gray color." ,
        "correct":false
    },
    "q5": {
        "question": "In which year did India gain independence?",
        "options": ["A. 1942", "B. 1947", "C. 1950", "D. 1962"],
        "correct_answer": "B. 1947",
        "hint" : "",
        "correct":false
    },"q6": {
        "question": "Which of the following is the largest ocean in the world?",
        "options": ["A. Atlantic Ocean", "B. Indian Ocean", "C. Pacific Ocean", "D. Arctic Ocean"],
        "correct_answer": "C. Pacific Ocean",
        "correct": false
    },
    "q7": {
        "question": "Who wrote the play 'Romeo and Juliet'?",
        "options": ["A. William Shakespeare", "B. Jane Austen", "C. Charles Dickens", "D. Emily Brontë"],
        "correct_answer": "A. William Shakespeare",
        "correct": false
    },
    "q8": {
        "question": "What is the currency of Japan?",
        "options": ["A. Yuan", "B. Yen", "C. Won", "D. Baht"],
        "correct_answer": "B. Yen",
        "correct": false
    },
    "q9": {
        "question": "Which element has the chemical symbol 'O'?",
        "options": ["A. Oxygen", "B. Gold", "C. Iron", "D. Uranium"],
        "correct_answer": "A. Oxygen",
        "correct": false
    },
    "q10": {
        "question": "Who painted the 'Mona Lisa'?",
        "options": ["A. Pablo Picasso", "B. Leonardo da Vinci", "C. Vincent van Gogh", "D. Claude Monet"],
        "correct_answer": "B. Leonardo da Vinci",
        "correct": false
    },
    "q11": {
        "question": "Which country is known as the 'Land of the Rising Sun'?",
        "options": ["A. China", "B. South Korea", "C. Japan", "D. Vietnam"],
        "correct_answer": "C. Japan",
        "correct": false
    },
    "q12": {
        "question": "Who wrote 'To Kill a Mockingbird'?",
        "options": ["A. J.K. Rowling", "B. Harper Lee", "C. George Orwell", "D. Ernest Hemingway"],
        "correct_answer": "B. Harper Lee",
        "correct": false
    }
}
const correctAnswers = Array(Object.keys(kbc_questions).length).fill(false);

const kbcPrizeMoney = [
    "₹1,000",
    "₹5,000",
    "₹10,000",
    "₹20,000",
    "₹40,000",
    "₹80,000",
    "₹1,60,000",
    "₹3,20,000",
    "₹6,40,000",
    "₹12,50,000",
    "₹25,00,000",
    "₹50,00,000"
    
];
console.log(option1)


const nextQuestion = ()=>{
    currentQuestionIndex++;
    displayQuestionAndAns()
    
   
    console.log("next question")
}

const displayQuestionAndAns = ()=>{
    const currentQuestion = kbc_questions[`q${currentQuestionIndex}`];
    
    question.innerHTML = currentQuestion.question;
    

    for(let i= 0;i<4;i++){
        const optionElement = document.getElementById(`option-${i + 1}`);
        optionElement.innerHTML = currentQuestion.options[i];
    }
    myAudio.play();

    resetTimer()
}

const selectOption = (optionId) => {
    // Remove the 'selected' class from all options
    for (let i = 1; i <= 4; i++) {
        const optionElement = document.getElementById(`option-${i}`);
        optionElement.classList.remove('selected');
    }

    // Add the 'selected' class to the clicked option
    const selectedOption = document.getElementById(optionId);
    selectedOption.classList.add('selected');

    console.log(selectedOption.textContent);
};



const verifyAns = () => {
    const selectedOption = document.querySelector('.selected');
    
    if (!selectedOption) {
        alert("Please select an option before confirming.");
        return;
    }

    const selectedText = selectedOption.textContent;
    const currentQuestion = kbc_questions[`q${currentQuestionIndex}`];

    if (currentQuestion.correct_answer === selectedText) {
        currentQuestion.correct = true;
        console.log("Correct!");
        displayGreenDots();
        nextQuestion();
    } else {
        alert("Wrong Answer!");
        quitGame()
    }
};

const displayGreenDots = () => {

    greenDotContainer.innerHTML = '';
    const questionsArray = Object.values(kbc_questions);
    console.log(questionsArray)
    for(let i = 0;i<questionsArray.length>0;i++){
        if(questionsArray[i].correct){
            const dotElement = document.createElement('div');
        dotElement.classList.add(greenDotClass);
       
        greenDotContainer.appendChild(dotElement);
        }
    }
    // Add green dots for correct answers
    // questionsArray.forEach((isCorrect, index) => {
    //     const dotElement = document.createElement('div');
    //     dotElement.classList.add(greenDotClass);
    //     dotElement.classList.toggle('correct', isCorrect); // Add 'correct' class if the answer is correct
    //     greenDotContainer.appendChild(dotElement);
    // });
};
const quitGame = () => {
  
     window.location.href = "name.html";
};
const playGame = ()=>{
    if(name.value === ''){
        alert("Please enter name")
    }
    else{
     currentQuestionIndex = 1;
    window.location.href = "index.html";
}
}

const startTimer = () => {
    updateTimerDisplay();
    timer = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();

        if (timerSeconds <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            quitGame();
        }
    }, 1000);
};

const updateTimerDisplay = () => {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerCountElement.textContent = formattedTime;
};

const resetTimer = () => {

    clearInterval(timer);
    if(currentQuestionIndex>6){
        timerSeconds = 60; // Reset the timer to 5 minutes
    }
    else{
        timerSeconds = 30;
    }
    
    startTimer();
};

const displayPrice = ()=>{
    for (let i = 0; i <kbcPrizeMoney.length; i++) {
        const prizeLevel = i+1;
        const prizeElement = document.createElement('div');
        const prizeAmount = kbcPrizeMoney[i];
        prizeElement.innerHTML = `<p>Level ${prizeLevel}: ${prizeAmount}</p>`;
        prizeContainer.appendChild(prizeElement);
    }
}

const lifeLine = ()=>{
    const currentQuestion = kbc_questions[`q${currentQuestionIndex}`];
    const correctOptionIndex = currentQuestion.options.findIndex(option => option === currentQuestion.correct_answer);
    const incorrectOptions = currentQuestion.options.filter((_, index) => index !== correctOptionIndex);
    const randomIncorrectOptionIndex = Math.floor(Math.random() * incorrectOptions.length);
    console.log( Math.floor(Math.random() * incorrectOptions.length))
    const remainingIncorrectOption = incorrectOptions[randomIncorrectOptionIndex];
    for (let i = 1; i <= 4; i++) {
        const optionElement = document.getElementById(`option-${i}`);
        const optionText = optionElement.textContent;
        if (optionText !== currentQuestion.correct_answer && optionText !== remainingIncorrectOption) {
            optionElement.textContent = ' ';
        }
    }

}

// const showHintButton = document.getElementById('show-button');
// showHintButton.addEventListener('click', () => {Hint()})  




const Hint=()=>{
    const selectedElement = kbc_questions[`q${currentQuestionIndex}`];
    const hintContainer = selectedElement.hint;
    const hintButton = document.getElementById('hint-container');
    hintButton.innerHTML = `<p> Hint: ${hintContainer}</p>`


}
displayQuestionAndAns()
displayPrice()