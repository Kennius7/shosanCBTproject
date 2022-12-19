import { examData } from "./examQuestionData.js";
import { nextButton, prevButton, submitButton, examQuestion,
        examOptionA, examOptionB, examOptionC, examOptionD } from "./DOM_Init.js";
import { examCountDownTimer } from "./examCountDownTimer.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//


/* ====================================FUNCTIONS AND DECLARATIONS====================================== */


//Empty array that will serve as a mini database for the option data inputs and will be used for validation.
const examOptionsDB = [];
/*Initialization of the indices of the objects in the examData array(for populating the questions and options),
which will be used in reference to the examOptionDB array, when injecting data into the array. */
let currentQuestion = 0;
const optionID = [examOptionA, examOptionB, examOptionC, examOptionD];
//Function for loading the exam questions and options. Will be called later down the code.
let loadExam = () => {
    let myExam = examData[currentQuestion];
    examQuestion.innerHTML = myExam.question;
    optionID[0].innerHTML = myExam.optionA;
    optionID[1].innerHTML = myExam.optionB;
    optionID[2].innerHTML = myExam.optionC;
    optionID[3].innerHTML = myExam.optionD;  
};

//Declaring the variable 'option' which will be used to determine whether an option has been selected or not.
let option = 0;

//Declaring the variables which will be used to determine which options have been selected and which haven't.
let optionSelector;
let otherOptionSelector1;
let otherOptionSelector2;
let otherOptionSelector3;

/*Declarations for the exam options values, which will be used to determine whether an option which was 
selected is the correct answer or not.*/
let examOptionAvalue;
let examOptionBvalue;
let examOptionCvalue;
let examOptionDvalue;

//Creating an Array for option answer values so they can be iterated.
const examOptionID = [examOptionAvalue, examOptionBvalue, examOptionCvalue, examOptionDvalue];

/*Creating a function for option answer values. Initially it was just an array but it wasn't reiterating
its check on the (currentQuestion) variable, and so remained at the initialization value throughout the run
of the CBT. When I used a function and called it in the Next AddEventListener, each function call made a 
check!*/
let examArrayOptionFunction = () => {
    let examArrayOptionID = [
        examData[currentQuestion].optionA,
        examData[currentQuestion].optionB,
        examData[currentQuestion].optionC,
        examData[currentQuestion].optionD
        ];

    return examArrayOptionID;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//


/* =====================================OPTION BUTTONS EVENT HANDLERS==================================== */


/*Creating functions for assigning data to the options when clicked, which will be used to determine whether
the option selected was the right answer or not, for color styling, differentiating it from other
non-selected buttons, and for reseting the button colors when the next question loads.*/
let optionColorReset = () => {
    examOptionA.style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
    examOptionB.style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
    examOptionC.style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
    examOptionD.style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
}
let optionFunct = () => {
    option = 1;
    examOptionID[optionSelector] = examArrayOptionFunction()[optionSelector]
    examOptionID[otherOptionSelector1] = "";
    examOptionID[otherOptionSelector2] = "";
    examOptionID[otherOptionSelector3] = "";
    optionID[optionSelector].style.backgroundImage = "linear-gradient(rgba(92, 65, 6, 0.4), rgb(92, 65, 6, 1.0))";
    optionID[otherOptionSelector1].style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
    optionID[otherOptionSelector2].style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
    optionID[otherOptionSelector3].style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
}

//Option button event listeners functions
    examOptionA.addEventListener('click', () => {
        optionSelector = 0;
        otherOptionSelector1 = 1;
        otherOptionSelector2 = 2;
        otherOptionSelector3 = 3;
        optionFunct();
    });
    examOptionB.addEventListener('click', () => {
        optionSelector = 1;
        otherOptionSelector1 = 2;
        otherOptionSelector2 = 3;
        otherOptionSelector3 = 0;
        optionFunct();
    });
    examOptionC.addEventListener('click', () => {
        optionSelector = 2;
        otherOptionSelector1 = 3;
        otherOptionSelector2 = 0;
        otherOptionSelector3 = 1;
        optionFunct();
    });
    examOptionD.addEventListener('click', () => {
        optionSelector = 3;
        otherOptionSelector1 = 0;
        otherOptionSelector2 = 1;
        otherOptionSelector3 = 2;
        optionFunct();
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//



/* ============================EXAM PAGE FUNCTION CALL AND VARIABLE INITIALIZATION====================== */

//Exam loader function called.
loadExam();
//The submit button display is disabled to only show up at the last question.
submitButton.style.display = "none";
//Exam score variable declared
export let examScore = 0;
//Importing and calling the exam countdown timer function.
examCountDownTimer();
//Creating a function to refresh the questions and options UI
let examQuestionSwitcher = () => {
    option = 0;
    currentQuestion++;
    optionColorReset();
    loadExam();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//




/*=================================EVENT HANDLERS FOR THE EXAM PAGE=====================================*/


//Next button event handler for describing the actions to be executed when the next button is clicked.
nextButton.addEventListener("click", () => {
    //======>When no option is selected, pop an alert saying you must click an option.
    if (currentQuestion < examData.length && option == 0) {
        alert("You must select an option");
    }

    //======>When an option is selected and that option is the correct answer and it has not been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && option == 1 && 
        examOptionID[optionSelector] == examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] != examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        examScore += 5;
        //In the line of code below, data is assigned to the examOptionDB array, indexed to the current question.
        examOptionsDB[currentQuestion] = examData[currentQuestion].correctAnswer;
        examQuestionSwitcher();
    }

    //======>When an option is selected and that option is the correct answer and it has been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && option == 1 && 
        examOptionID[optionSelector] == examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] == examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        examQuestionSwitcher();
    }

    //======>When an option is selected and that option is the wrong answer and it has not been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && option == 1 && 
        examOptionID[optionSelector] != examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] != examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        examOptionsDB[currentQuestion] = null;
        examQuestionSwitcher();
    }

    //======>When an option is selected and that option is the wrong answer and it has been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && option == 1 && 
        examOptionID[optionSelector] != examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] == examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        examScore -= 5;
        /*In the line of code below, data type (null) is assigned to the array item indexed to the current question 'index'.
        This will change the value and subtract the score for that question, so that if it is answered correctly
        on another attempt, it will increment the score.*/
        examOptionsDB[currentQuestion] = null;
        examQuestionSwitcher();
    }

    //======>When it is the last question and the first option is selected and it is the correct answer.
    else if (currentQuestion == examData.length - 1 && option == 1 &&
        examOptionID[optionSelector] == examData[currentQuestion].correctAnswer){
        
        examScore += 5;
        examOptionsDB[currentQuestion] = examData[currentQuestion].correctAnswer;
        submitButton.style.display = "block";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    }

    //======>When it is the last question and any option selected is the wrong answer.
    else if (currentQuestion == examData.length - 1 && option == 1){

        submitButton.style.display = "block";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//

//Previous button event handler for describing the actions to be executed when the previous button is clicked.
prevButton.addEventListener("click", () => {
    if (currentQuestion < examData.length && currentQuestion > 0){

        submitButton.style.display = "none";
        currentQuestion--;
        option = 0;
        optionColorReset();
        loadExam();
    }
    else if (currentQuestion == 0) {
        window.location.href = "startPage.html"
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//

//Submit button event handler for describing the actions to be executed when the submit button is clicked.
submitButton.addEventListener("click", () => {
    localStorage.setItem("scoreVal", examScore);
    window.location.href = "scorePage.html"
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//============================================END OF CODE===============================================//


