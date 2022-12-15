import { scorePrint } from "./DOM_Init.js";



let userName = localStorage.getItem("nameVal");
let userScore = localStorage.getItem("scoreVal");


//Function for displaying the final exam score on the score page.
let printScore = () => {
    setInterval(() => {
        scorePrint.innerHTML = `<span class="text-info">${userName}</span>, 
        your exam score is <span class="text-info">${userScore}/50.</span>`;
        
    }, 1000);
}
printScore();


