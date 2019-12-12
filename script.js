// On a recurring timer

let fullQnASet = [];
let blnGlobalPlayStart = false;
let creditsTotal = 0;
let fishBasicCounter = 0;
let difficultyLevel = 'hard';
let fishSet = [];
let requestIDTimer;


// Difficulty level selector
document.querySelectorAll(`.level-button`).forEach(e => {
    e.onclick = function() {
    difficultyLevel = e.value;
    }
})

// Basic arithmatic type question
const qBasicMath = () => {
    const arrayOperationSelector = ['+','-','*','/'];
    let randomUpperLimit = 0
    switch (difficultyLevel){
        case 'easy':
            randomUpperLimit = 9;
            break;
        case 'medium':
            randomUpperLimit = 19;
            break;
        case 'hard':
            randomUpperLimit = 99;
            break;
    }
    const randomNumber1 = Math.floor(Math.random()*randomUpperLimit)+1;
    const randomNumber2 = Math.floor(Math.random()*randomUpperLimit)+1;
    const randomOperation = arrayOperationSelector[Math.floor(Math.random()*arrayOperationSelector.length)];
    const questionString = `${randomNumber1} ${randomOperation} ${randomNumber2}`;
    const answerValue = eval(eval(randomNumber1 + randomOperation + randomNumber2).toPrecision(2));
    const isPercentage = false;
    return [questionString,answerValue,isPercentage];
}

// Percentages type question
const qPercentage = () => {
    let randomUpperLimit = 0
    switch (difficultyLevel){
        case 'easy':
            randomUpperLimit = 9;
            break;
        case 'medium':
            randomUpperLimit = 19;
            break;
        case 'hard':
            randomUpperLimit = 99;
            break;
    }
    const randomNumber1 = Math.floor(Math.random()*randomUpperLimit)+1;
    const randomNumber2 = Math.floor(Math.random()*randomUpperLimit)+1;
    const questionString = `${randomNumber1}% of ${randomNumber2}`;
    const answerValue = eval(((randomNumber1/100)*randomNumber2).toPrecision(2));
    const isPercentage = false;
    return [questionString,answerValue,isPercentage];
}

// Growth rates type question
const qGrowthRate = () => {
    let growthRateOptions = [0.25,0.5,1,2,3,4,5,6,7,8,9,10,12,15,18,20,22,25,27,30,40,50,60,70,80,90,100];
    let periodOptions = [2,3,4,5,6,7,8,9,10,15,20,30,40,50];
    switch (difficultyLevel){
        case 'easy':
            growthRateOptions = [1,2,3,4,5];
            periodOptions = [2,3,4,5];
            break;
        case 'medium':
            growthRateOptions = [1,2,3,4,5,6,7,8,9,10];
            periodOptions = [2,3,4,5,6,7,8];
            break;
        case 'hard':
            growthRateOptions = [0.25,0.5,1,2,3,4,5,6,7,8,9,10,12,15,18,20,25,30,40,50,60,80,100];
            periodOptions = [2,3,4,5,6,7,8,9,10,15,20];
            break;
    }
    const randomGrowthRate = growthRateOptions[Math.floor(Math.random()*growthRateOptions.length)];
    const randomPeriod = periodOptions[Math.floor(Math.random()*periodOptions.length)];
    const questionString = `Grows at ${randomGrowthRate}% for ${randomPeriod} periods overall growth?`;
    const answerValue = eval(((1+randomGrowthRate/100)**randomPeriod - 1).toPrecision(2));
    const isPercentage = true;
    return [questionString,answerValue,isPercentage];
  }

// Produce full set of Q&A information
let setupfullQnASet = () => {
    const arrayQuestionSelector = [qBasicMath(), qBasicMath(), qBasicMath(), qBasicMath(), qPercentage(), qGrowthRate()];
    const selectedQAPair = arrayQuestionSelector[Math.floor(Math.random()*arrayQuestionSelector.length)];
    const realQuestion = selectedQAPair[0];  
    let realAnswer = selectedQAPair[1];
    const isPercentage = selectedQAPair[2]
    // increment of 1/shuffleFactor, in this case 1/5 = +/-20 % around middle
    const shuffleFactor = 5; 
    const shuffleArray = [[1,shuffleFactor/(shuffleFactor-1),(shuffleFactor+1)/(shuffleFactor-1)],[(shuffleFactor-1)/shuffleFactor,1,(shuffleFactor+1)/shuffleFactor],[(shuffleFactor-1)/(shuffleFactor+1),shuffleFactor/(shuffleFactor+1),1]];
    const selectedShuffle = shuffleArray[Math.floor(Math.random()*shuffleArray.length)];
    let answerA = eval((realAnswer*selectedShuffle[0]).toPrecision(2));
    let answerB = eval((realAnswer*selectedShuffle[1]).toPrecision(2));
    let answerC = eval((realAnswer*selectedShuffle[2]).toPrecision(2));
    let fullQnASet = [realQuestion, realAnswer, answerA, answerB, answerC, isPercentage];
    return fullQnASet;
}

// Pass the info to the page
let buttonImport = (fullQnASet) => {
    const realQuestion = fullQnASet[0];
    const answerA = fullQnASet[2];
    const answerB = fullQnASet[3];
    const answerC = fullQnASet[4];
    const isPercentage = fullQnASet[5];

    document.querySelector(`.question-section`).textContent = realQuestion;

    document.querySelector(`.button-A`).value = answerA;
    document.querySelector(`.button-B`).value = answerB;
    document.querySelector(`.button-C`).value = answerC;

    if (isPercentage === true) {
        document.querySelector(`.button-A`).innerHTML  = `${Intl.NumberFormat().format(eval((answerA*100).toPrecision(2)))}%`;
        document.querySelector(`.button-B`).innerHTML  = `${Intl.NumberFormat().format(eval((answerB*100).toPrecision(2)))}%`;
        document.querySelector(`.button-C`).innerHTML  = `${Intl.NumberFormat().format(eval((answerC*100).toPrecision(2)))}%`;
    } else {
        document.querySelector(`.button-A`).innerHTML = Intl.NumberFormat().format(answerA);
        document.querySelector(`.button-B`).innerHTML = Intl.NumberFormat().format(answerB);
        document.querySelector(`.button-C`).innerHTML = Intl.NumberFormat().format(answerC);
    }
}

// Generate new Q&A
let generateNewQuestion = () => {
    // Set up new Q&A
    fullQnASet = setupfullQnASet()
    // Set up new Buttons
    buttonImport(fullQnASet);
}

// On click of an anwser button, check if the answer is correct, re-set timer, and re-do the Q&A
document.querySelectorAll(`.answerButton`).forEach(e => {
    e.onclick = function() {
    if (blnGlobalPlayStart){
    let newCredits = 0;
    let delay = 0;
    const clickedValue = e.value;
    const realAnswer = fullQnASet[1];
    if (clickedValue == realAnswer) {
        console.log(`Correct!`)
        newCredits = timeleft;
        delay = 1000;
    } else {
        console.log(`Incorrect!`)
        showCorrectAnswer();
        delay = 4000;
    }
    addCredits(newCredits);
    timeleft = 10;
    setTimeout(generateNewQuestion(),delay);
    }}
})

const setDelay = () => console.log('Delay!');

// Start the game, initializing at first start
let blnFirstStart = true;
let timeleft = 0

// Start Q&A Timer

const startQnATimer = () => {
  if (blnGlobalPlayStart) {
  document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  timeleft -= 1;
    if(timeleft < 0){
            // Re-set timer    
            timeleft = 10;
            generateNewQuestion();
    }
  }
}

//Create a requestID to avoid bugs in your timer
if (!requestIDTimer){
    requestIDTimer = setInterval (startQnATimer,1000);
}

// Play the game
const playStart = () => {
    blnGlobalPlayStart = true;
    timeleft = 10;
    startQnATimer();
    generateNewQuestion();
    // setTimeout(generateNewQuestion(),2000);
    //On first start give a free fish
    if (blnFirstStart) {
        createFish();
        }
    //Hereon out no free lunch
    blnFirstStart = false;
    //START THE GAME
    loopControl.start();
}

// Pause the game
const playPause = () => {
    blnGlobalPlayStart = false;
    requestIDTimer = undefined;
    document.getElementById("countdown").innerHTML = 'Timer'
    document.querySelector(`.question-section`).textContent = 'Question';
    document.querySelector(`.button-A`).innerHTML = 'Answer A';
    document.querySelector(`.button-B`).innerHTML = 'Answer B';
    document.querySelector(`.button-C`).innerHTML = 'Answer C';
    blnFirstStart = false;
    loopControl.stop();
}

// On click, start the game
document.querySelector(`.start-play`).onclick = playStart;

// On click, pause the game
document.querySelector(`.pause-play`).onclick = playPause;

// Add credits
const addCredits = inputCredits => {
    creditsTotal += inputCredits;
    document.getElementById("credits-counter").innerHTML = creditsTotal;
}

// Remove credits
const removeCredits = inputCredits => {
    creditsTotal -= inputCredits;
    document.getElementById("credits-counter").innerHTML = creditsTotal;
}

// Count fish



// Show correct answer 
const showCorrectAnswer = () => {
    const realQuestion = fullQnASet[0];
    const realAnswer = fullQnASet[1];
    const isPercentage = fullQnASet[5];

    if (isPercentage === true) {
        document.querySelector(`.question-section`).innerHTML  = realQuestion + ' = ' + `${Intl.NumberFormat().format(eval((realAnswer*100).toPrecision(2)))}%`;
     } else {
        document.querySelector(`.question-section`).innerHTML = realQuestion + ' = ' + Intl.NumberFormat().format(realAnswer);
    }
}




// Buy Food
document.getElementById(`buy-food`).onclick = function() {
    if (creditsTotal < 25){
    } else {
        console.log('feedFish')
        removeCredits(25);
        //feedFish();
    }
}

// Buy Fish
document.getElementById(`buy-fish`).onclick = function() {
    if (creditsTotal < -1){
    } else {
        createFish();
        removeCredits(0);
        //buyFish();
    }
}


// Fish counter 
const fishCount = () => {

}


// Feed fish 

//Timer 



