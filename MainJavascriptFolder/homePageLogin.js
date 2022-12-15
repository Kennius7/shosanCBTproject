import { fullNameValue, errMsg2, loginButton } from "./DOM_Init.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//


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
blankErrMsg();



//Function for validating the form on the index page.
loginButton.addEventListener('click', () => {
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
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//======================================================================================================//

