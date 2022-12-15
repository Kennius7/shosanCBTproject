import { examOptionA, examOptionB, examOptionC, examOptionD, examQuestion } from "./DOM_Init.js";
import { examData } from "./examQuestionData.js";




/*Initialization of the indices of the objects in the examData array(for populating the questions and options),
which will be used in reference to the examOptionDB array, when injecting data into it. */
export let currentQuestion = 0;
export const optionID = [examOptionA, examOptionB, examOptionC, examOptionD];
//Function for loading the exam questions and options. Will be called later down the code.
export let loadExam = () => {
    let myExam = examData[currentQuestion];
    examQuestion.innerHTML = myExam.question;
    optionID[0].innerHTML = myExam.optionA;
    optionID[1].innerHTML = myExam.optionB;
    optionID[2].innerHTML = myExam.optionC;
    optionID[3].innerHTML = myExam.optionD;  
};
