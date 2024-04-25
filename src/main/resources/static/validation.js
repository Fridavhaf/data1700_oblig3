//name regex from chatGPT
let validName  = /^[\p{L}\p{M}'\-]+(?: [\p{L}\p{M}'\-]+)*$/u;
//email regex from https://regexr.com/3e48o
let validEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
let validPnumber = /^[0-9]{8}$/;
let validAmount = /^[1-9][0-9]?$|^100$/; //valid up to 100

//Functions validating input, returning either the value or null
function validateFname(){
    let fName = $("#fName").val();
    if(fName.match(validName)){return fName;}
    else {return null;}
}

function validateLname(){
    let lName = $("#lName").val();
    if (lName.match(validName)){return lName;}
    else{return null;}
}

function validateEmail(){
    let email = $("#email").val();
    if (email.match(validEmail)){return email;}
    else{return null;}
}

function validatePnumber(){
    let pNumber = $("#pNumber").val();
    if (pNumber.match(validPnumber)){
        return pNumber;
    }
    else {
        return null;
    }
}

function validateNumber(){
    //We check that input is a number, and if it has 8 digits (norwegian number)
    let number = $("#nrOfTickets").val();
    if (number.match(validAmount)){
        return number;
    }
    else {
        return null;
    }
}

function validateMovie(){
    let movie = $("#movie").val();
    if (movie === ""){return null;}
    else {return movie;}
}

function removeErrorMovie(){
    if(validateMovie()) {
        $("#errorMovie").html("");
    }
}
function removeErrorNr(){
    if(validateNumber()){
        $("#errorNumber").html("");
    }
}
function removeErrorFname(){
    if(validateFname()){
        $("#errorFname").html("");
    }
}
function removeErrorLname(){
    if(validateLname()){
        $("#errorLname").html("");
    }
}
function removeErrorPnumber(){
    if (validatePnumber()){
        $("#errorPnumber").html("");
    }
}
function removeErrorEmail(){
    if (validateEmail()){
        $("#errorEmail").html("");
    }
}