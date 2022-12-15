"use strict"

import { examData } from "./examQuestionData.js";
import { examCountDownTimer } from "./examCountDownTimer.js";
import { fullNameValue, errMsg2, nextButton, prevButton, submitButton, scorePrint } from "./DOM_Init.js";
import { optionEventListener, optionColorReset, optionSelector, examOptionID, optionFunction } from "./optionBTNEventHandler.js";
import { currentQuestion, loadExam } from "./examLoader.js";







//Empty array that will serve as a mini database for the option data inputs and will be used for validation.
const examOptionsDB = [];



/* ====================================FUNCTIONS AND DECLARATIONS====================================== */

/*Function for displaying a blank space three seconds after the error message has displayed, 
in the index page form, during form validation.*/
let alertTimeOut = () => {
    setTimeout(() => {
        errMsg2.innerHTML = "<span class='text-light'>blank</span>";
    }, 3000)
};

/*Function for maintaining a blank text space where the error messages for the index page form,
should display.*/
let t = 0;
let blankErrMsg = () =>{
    setInterval(() => {
        t++;
        errMsg2.innerHTML = "<span class='text-light'>blank</span>";    
    }, 1000);
}
// blankErrMsg();

//Function for validating the form on the index page.
let cbtValidate = () => {
    if(document.cbtForm.emailForm.value == "" && document.cbtForm.passwordForm.value == "" && fullNameValue.value == ""){
        errMsg2.innerHTML = "All fields must be filled!" 
        event.preventDefault();
        alertTimeOut();
        }
    else if(document.cbtForm.emailForm.value == "" && document.cbtForm.passwordForm.value != "exam" && fullNameValue.value == ""){
        errMsg2.innerHTML = "All fields must be filled!" 
        event.preventDefault();
        alertTimeOut();
        }
    else if(document.cbtForm.emailForm.value != "" && 
        document.cbtForm.passwordForm.value != "exam" && document.cbtForm.passwordForm.value != "" && 
        fullNameValue.value != ""){
        errMsg2.innerHTML = "Incorrect Password!"
        event.preventDefault();
        alertTimeOut();
        }
    else if(document.cbtForm.emailForm.value == "" || document.cbtForm.passwordForm.value == "" || fullNameValue.value == ""){
        errMsg2.innerHTML = "All fields must be filled!"
        event.preventDefault();
        alertTimeOut();
        }
    else if(document.cbtForm.emailForm.value != "" && document.cbtForm.passwordForm.value == "exam" && fullNameValue.value != "") {
        localStorage.setItem("nameVal", fullNameValue.value);
        console.log("Success");
        }
};

//Function for displaying the final exam score on the score page.
let time1 = 0;
let printScore = () => {
    setInterval(() => {
        time1++;
        scorePrint.innerHTML = `<span class="text-info">${localStorage.getItem("nameVal")}</span>, your exam score is <span class="text-info">${localStorage.getItem("scoreVal")}/50.</span>`;
    }, 1000);
}
// printScore();


//Calling the exam timer function.
examCountDownTimer();

//Calling the option event handler function.
optionEventListener();




/* ============================EXAM PAGE FUNCTION CALL AND VARIABLE INITIALIZATION====================== */

//Exam loader function called.
loadExam();
//The submit button display is disabled to only show up at the last question.
submitButton.style.display = "none";
//Exam score variable declared
let examScore = 0;





/*=================================EVENT HANDLERS FOR THE EXAM PAGE=====================================*/


//Next button event handler for describing the actions to be executed when the next button is clicked.
nextButton.addEventListener("click", () => {
    //======>When no option is selected, pop an alert saying you must click an option.
    if (currentQuestion < examData.length && optionFunction == 0) {
        alert("You must select an option");
    }

    //======>When an option is selected and that option is the correct answer and it has not been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && optionFunction() == 1 && 
        examOptionID[optionSelector] == examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] != examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        examScore += 5;
        optionFunction(0);
        //In the line of code below, data is assigned to the examOptionDB array, indexed to the current question.
        examOptionsDB[currentQuestion] = examData[currentQuestion].correctAnswer;
        currentQuestion++;
        optionColorReset();
        loadExam();
    }

    //======>When an option is selected and that option is the correct answer and it has been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && optionFunction == 1 && 
        examOptionID[optionSelector] == examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] == examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        optionFunction(0);
        currentQuestion++;
        optionColorReset();
        loadExam();
    }

    //======>When an option is selected and that option is the wrong answer and it has not been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && optionFunction == 1 && 
        examOptionID[optionSelector] != examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] != examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        optionFunction(0);
        examOptionsDB[currentQuestion] = null;
        currentQuestion++;
        optionColorReset();
        loadExam();
    }

    //======>When an option is selected and that option is the wrong answer and it has been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && optionFunction == 1 && 
        examOptionID[optionSelector] != examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] == examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        examScore -= 5;
        optionFunction(0);
        optionColorReset();
        /*In the line of code below, data type null is assigned to the array item indexed to the current question 'index'.
        This will change the value and subtract the score for that question, so that if it is answered correctly
        on another attempt, it will increment the score.*/
        examOptionsDB[currentQuestion] = null;
        currentQuestion++;
        loadExam();
    }

    //======>When it is the last question and the first option is selected and it is the correct answer.
    else if (currentQuestion == examData.length - 1 && optionFunction == 1 &&
        examOptionID[optionSelector] == examData[currentQuestion].correctAnswer){
        
        examScore += 5;
        examOptionsDB[currentQuestion] = examData[currentQuestion].correctAnswer;
        submitButton.style.display = "block";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    }

    //======>When it is the last question and any option selected is the wrong answer.
    else if (currentQuestion == examData.length - 1 && optionFunction == 1){

        submitButton.style.display = "block";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    }
});


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


//Submit button event handler for describing the actions to be executed when the submit button is clicked.
submitButton.addEventListener("click", () => {
    localStorage.setItem("scoreVal", examScore);
});
//
//
//
//
//
//
//============================================END OF CODE===============================================//