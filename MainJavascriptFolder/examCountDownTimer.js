import { quizWarnText, examTimer } from "./DOM_Init.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//

//Creating variables for the exam countdown timer function.
let b = 300;
let sec2 = 0;
let mins2 = 0;
let hrs2 = 0;
let setInt3 = 0;

//Function for the countdown timer during the exam, which when it gets to zero, it will load the score page.

export let examCountDownTimer = () => {
   setInt3 = setInterval(() => {
    b--;
    quizWarnText.innerHTML = `You have <span style="color: goldenrod">${hrs2} hours, ${mins2} minutes 
    and ${sec2} seconds</span> left, after which your exam will be terminated and you will be directed 
    to your score page.`
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//

