"use strict"
/* ===============================ARRAYS AND OBJECTS SECTION=========================================== */


//Array of objects that holds the exam questions and correct answers data.
const examData = [
    {question: "1. What is the capital of Argentina?",
     optionA: "1. Montevideo",
     optionB: "2. Buenos Aires",
     optionC: "3. Maracana",
     optionD: "4. Abuja",
     correctAnswer: "2. Buenos Aires"  
},
    {question: "2. The American civil war started in the year.....?",
     optionA: "1. 1776",
     optionB: "2. 1886",
     optionC: "3. 1793",
     optionD: "4. 1861",
     correctAnswer: "4. 1861"  
},
    {question: "3. A quantity in physics that needs both magnitude and direction for description is called a ________ quantity?",
     optionA: "1. Scalar",
     optionB: "2. Linear",
     optionC: "3. Vector",
     optionD: "4. Boolean",
     correctAnswer: "3. Vector"  
},
{question: "4. What was the estimated population of China as at 2020?",
     optionA: "1. 1.6 Billion",
     optionB: "2. 1.8 Million",
     optionC: "3. 1.4 Billion",
     optionD: "4. 800 Million",
     correctAnswer: "3. 1.4 Billion"  
},
    {question: "5. The largest planet in our solar system is...?",
     optionA: "1. Saturn",
     optionB: "2. Neptune",
     optionC: "3. Jupiter",
     optionD: "4. Uranus",
     correctAnswer: "3. Jupiter"  
},
    {question: "6. Who was the second governor general of Nigeria?",
     optionA: "1. Sir James Wilson Robertson",
     optionB: "2. Sir Hugh Clifford",
     optionC: "3. Lord Lugard",
     optionD: "4. Nnamdi Azikiwe",
     correctAnswer: "1. Sir James Wilson Robertson"  
},
    {question: "7. The best language for creating web pages is...?",
    optionA: "1. XHTML",
    optionB: "2. XML",
    optionC: "3. HTML",
    optionD: "4. XMTHL",
    correctAnswer: "3. HTML"  
},
    {question: "8. The driest desert in the world is?",
    optionA: "1. Atacama",
    optionB: "2. Sahara",
    optionC: "3. Kalahari",
    optionD: "4. Moldave",
    correctAnswer: "1. Atacama"  
},
    {question: "9. Which of these below is the least desired character a programmer should have?",
    optionA: "1. Willing to learn everyday",
    optionB: "2. Self encouragement",
    optionC: "3. Patience",
    optionD: "4. Coding alone without help",
    correctAnswer: "4. Coding alone without help"  
},
    {question: "10. Does a programming language called FETCH-XL exist?",
    optionA: "1. Yes",
    optionB: "2. No",
    optionC: "3. No, but they are working on it",
    optionD: "4. Yes, but not released to the public",
    correctAnswer: "2. No"  
},
];
//Empty array that will serve as a mini database for the option data inputs and will be used for validation.
const examOptionsDB = [];



/* ===================================DOM INITIALIZATIONS============================================== */


//DOM initialization for the name value entered in the form on the index page.
const fullNameValue = document.getElementById("fullName");
//DOM initialization for the form error message on the index page.
const errMsg2 = document.getElementById("passErrorMsg");
//DOM initialization for populating the questions on the exam page.
const examQuestion = document.getElementById("question");
//DOM initialization for populating the option buttons on the exam page.
const examOptionA = document.getElementById("opA");
const examOptionB = document.getElementById("opB");
const examOptionC = document.getElementById("opC");
const examOptionD = document.getElementById("opD");

//DOM initialization for the next button on the exam page.
const nextButton = document.getElementById("nextBtn");
//DOM initialization for the previous button on the exam page.
const prevButton = document.getElementById("prevBtn");
//DOM initialization for the submit button on the exam page.
const submitButton = document.getElementById("submit");
//DOM initialization for the exam timer at the top left of the exam page.
const examTimer = document.getElementById("timer1");
//DOM initialization for the timer message at the bottom of the exam page.
const quizWarnText = document.getElementById("warnText");
//DOM initialization for the final exam score display on the score page.
const scorePrint = document.getElementById("scorePrintOut");




/* ====================================FUNCTIONS AND DECLARATIONS====================================== */


/*Function for displaying a blank space three seconds after the error message has displayed, 
in the index page form, during form validation.*/
let alertTimeOut = () => {
    setTimeout(() => {
        errMsg2.innerHTML = "<span class='text-light'>blank</span>";
    }, 3000)
};
/*Initialization of the indices of the objects in the examData array(for populating the questions and options),
which will be used in reference to the examOptionDB array, when injecting data into it. */
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

/*Function for maintaining a blank text space where the error messages for the index page form,
should display.*/
let t = 0;
let blankErrMsg = () =>{
    setInterval(() => {
        t++;
        errMsg2.innerHTML = "<span class='text-light'>blank</span>";    
    }, 1000);
}
blankErrMsg();

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
printScore();

//Function for the countdown timer during the exam, which when it gets to zero, it will load the score page.
let b = 300;
let sec2 = 0;
let mins2 = 0;
let hrs2 = 0;
let setInt3 = 0;
let examCountDownTimer = () => {
   setInt3 = setInterval(() => {
    b--;
    quizWarnText.innerHTML = `You have <span style="color: goldenrod">${hrs2} hours, ${mins2} minutes 
    and ${sec2} seconds</span> left, after which your exam will be terminated and you will be directed 
    to your score page. ${examScore}`
    sec2 = Math.floor(b % 3600 % 60 );
    mins2 = Math.floor(b % 3600 / 60);
    hrs2 = Math.floor(b / 3600);

    let displayTimer1 = `0${hrs2} : 0${mins2} : 0${sec2}`
    let displayTimer2 = `0${hrs2} : ${mins2} : 0${sec2}`
    let displayTimer3 = `0${hrs2} : ${mins2} : ${sec2}`
    let displayTimer4 = `0${hrs2} : 0${mins2} : ${sec2}`
    let displayTimer5 = `${hrs2} : 0${mins2} : 0${sec2}`
    let displayTimer6 = `${hrs2} : ${mins2} : 0${sec2}`
    let displayTimer7 = `${hrs2} : ${mins2} : ${sec2}`
    let displayTimer8 = `${hrs2} : 0${mins2} : ${sec2}`

    if (hrs2 < 10 && mins2 < 10 && sec2 < 10) {
        examTimer.innerHTML = displayTimer1;    
    }
    else if (hrs2 < 10 && mins2 > 9 && sec2 < 10) {
        examTimer.innerHTML = displayTimer2;
    }
    else if (hrs2 < 10 && mins2 > 9 && sec2 > 9) {
        examTimer.innerHTML = displayTimer3;
    }
    else if (hrs2 < 10 && mins2 < 10 && sec2 > 9) {
        examTimer.innerHTML = displayTimer4;
    }
    else if (hrs2 > 9 && mins2 < 10 && sec2 < 10) {
        examTimer.innerHTML = displayTimer5;    
    }
    else if (hrs2 > 9 && mins2 > 9 && sec2 < 10) {
        examTimer.innerHTML = displayTimer6;
    }
    else if (hrs2 > 9 && mins2 > 9 && sec2 > 9) {
        examTimer.innerHTML = displayTimer7;
    }
    else if (hrs2 > 9 && mins2 < 10 && sec2 > 9) {
        examTimer.innerHTML = displayTimer8;
    }
   }, 1000);

   setTimeout(() => {
       clearInterval(setInt3);
       examTimer.innerHTML = "Time Up!"
   }, 300000);
   setTimeout(() => {
    examTimer.innerHTML = ""
    window.location.href = "scorePage.html";
}, 303000);
}
//Calling the exam timer function.
examCountDownTimer();


//Declaring the variable 'option' which will be used to determine whether an option has been selected or not.
let option = 0;
//Declaring the variables which will be used to determine which options have been selected and which haven't.
let optionSelector;
let otherOptionSelector1;
let otherOptionSelector2;
let otherOptionSelector3;

/*Declarations for the exam options(buttons) functions, which will be used to determine whether an option
which was selected is the correct answer or not.*/
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







/* =====================================OPTION BUTTONS EVENT HANDLERS==================================== */


/*Creating functions for assigning data to the options when clicked, which will be used to determine whether
the option selected was the right answer or not, and for color styling, differentiating it from other
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
/*Option button event listeners functions*/
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
    optionFunct()
});
examOptionC.addEventListener('click', () => {
    optionSelector = 2;
    otherOptionSelector1 = 3;
    otherOptionSelector2 = 0;
    otherOptionSelector3 = 1;
    optionFunct()
});
examOptionD.addEventListener('click', () => {
    optionSelector = 3;
    otherOptionSelector1 = 0;
    otherOptionSelector2 = 1;
    otherOptionSelector3 = 2;
    optionFunct()
});





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
    if (currentQuestion < examData.length && option == 0) {
        alert("You must select an option");
    }

    //======>When an option is selected and that option is the correct answer and it has not been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && option == 1 && 
        examOptionID[optionSelector] == examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] != examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        examScore += 5;
        option = 0;
        //In the line of code below, data is assigned to the examOptionDB array, indexed to the current question.
        examOptionsDB[currentQuestion] = examData[currentQuestion].correctAnswer;
        currentQuestion++;
        optionColorReset();
        loadExam();
    }

    //======>When an option is selected and that option is the correct answer and it has been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && option == 1 && 
        examOptionID[optionSelector] == examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] == examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        option = 0;
        currentQuestion++;
        optionColorReset();
        loadExam();
    }

    //======>When an option is selected and that option is the wrong answer and it has not been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && option == 1 && 
        examOptionID[optionSelector] != examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] != examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        option = 0;
        examOptionsDB[currentQuestion] = null;
        currentQuestion++;
        optionColorReset();
        loadExam();
    }

    //======>When an option is selected and that option is the wrong answer and it has been selected before.
    else if (currentQuestion >= 0 && currentQuestion < examData.length - 1 && option == 1 && 
        examOptionID[optionSelector] != examData[currentQuestion].correctAnswer && 
        examOptionsDB[currentQuestion] == examData[currentQuestion].correctAnswer){
        
        submitButton.style.display = "none";
        examScore -= 5;
        option = 0;
        optionColorReset();
        /*In the line of code below, data type null is assigned to the array item indexed to the current question 'index'.
        This will change the value and subtract the score for that question, so that if it is answered correctly
        on another attempt, it will increment the score.*/
        examOptionsDB[currentQuestion] = null;
        currentQuestion++;
        loadExam();
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