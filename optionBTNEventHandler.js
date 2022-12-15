import { examOptionA, examOptionB, examOptionC, examOptionD } from "./DOM_Init.js";
import { examData } from "./examQuestionData.js";
import { currentQuestion, optionID } from "./examLoader.js";





let option = 0;

//Declaring the variable 'option' which will be used to determine whether an option has been selected or not.

// export let optionFunction = () => { 
//     setInterval(() => {
//         return option   
//     }, 1000);
// }

//Declaring the variables which will be used to determine which options have been selected and which haven't.
export let optionSelector;
export let otherOptionSelector1;
export let otherOptionSelector2;
export let otherOptionSelector3;

/*Declarations for the exam options(buttons) functions, which will be used to determine whether an option
which was selected is the correct answer or not.*/
let examOptionAvalue;
let examOptionBvalue;
let examOptionCvalue;
let examOptionDvalue;

//Creating an Array for option answer values so they can be iterated.
export const examOptionID = [examOptionAvalue, examOptionBvalue, examOptionCvalue, examOptionDvalue];

/*Creating a function for option answer values. Initially it was just an array but it wasn't reiterating
its check on the (currentQuestion) variable, and so remained at the initialization value throughout the run
of the CBT. When I used a function and called it in the Next AddEventListener, each function call made a 
check!*/
export let examArrayOptionFunction = () => {
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
export let optionColorReset = () => {
    examOptionA.style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
    examOptionB.style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
    examOptionC.style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
    examOptionD.style.backgroundImage = "linear-gradient(rgba(2, 2, 2, 0.4), rgb(2, 2, 2))";
}
export let optionFunct = () => {
    optionFunction(1);
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
export function optionEventListener() {
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
}
