/*ready function. This ensures that your JavaScript code doesn't try to interact
with HTML elements before they exist, preventing errors and ensuring proper functionality.*/
$(function (){

    //name regex from https://brettrawlins.com/blog/regular-expression-for-international-names
    let validName  = /^[\p{Letter}\s\-.']+$/u;
    //email regex from https://regexr.com/3e48o
    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
        let p_number = $("#pNumber").val();
        let pNumber = Number(p_number);
        if (pNumber > 9999999 && pNumber < 10000000 && isNaN(pNumber)){
            return null;}
        else {return pNumber;}
    }
    function validateNumber(){
        //We check that input is a number, and if it has 8 digits (norwegian number)
        let number = Number($("#nrOfTickets").val())
        if (isNaN(number) || number < 1 || number > 100){
            return null;
        }
        else {return number;}
    }
    function validateMovie(){
        let movie = $("#movie").val();
        if (movie === ""){return null;}
        else {return movie;}
    }

    //when button is clicked we have variables that are defined by the validation functions
    $("#registerTicket").click(function (){
        let fName = validateFname();
        let lName = validateLname();
        let movie = validateMovie();
        let email = validateEmail();
        let pNumber = validatePnumber();
        let number = validateNumber();

        //returning error messages to user
       // for jQuery if else: $("#errorFname").text(fName ? "" : "Invalid first name"); Same as:

        $("#errorFname").text(fName ? "" : "Invalid first name");
        $("#errorLname").text(lName ? "" : "Invalid last name");
        $("#errorPnumber").text(pNumber ? "" : "Invalid phone number");
        $("#errorEmail").text(email ? "" : "Invalid email address");
        $("#errorNumber").html(number ? "" : "Invalid amount of tickets");
        $("#errorMovie").html(movie ? "" : "Please choose movie");

        //If no values are null, we can make the object
        if(lName !== null && fName !== null && movie !== null
        && email !== null && number !== null && pNumber !== null) {
            const ticket = {
                //These variables have to be the same as in the POJO
                firstName : fName,
                lastName : lName,
                movieName : movie,
                nrOfTickets : number,
                phoneNumber : pNumber,
                emailAddress : email
            }
            //We call the PostMapping with the url that adds object to array.
            // ticket (object we made) is the in-parameter.
            // We want showTickets executed once the request is completed
            $.post("/saveTicket", ticket, function (){
                showTickets();
            })

            //clearing input fields
            $("#fName").val("");
            $("#lName").val("");
            $("#movie").val("");
            $("#nrOfTickets").val("");
            $("#pNumber").val("");
            $("#email").val("");
        }
    });

    //We define showTickets() as a function that gets data from the server.
    //As we see in controller, the "/showTickets" url is returning all tickets.
    //But we want structure. So the data is sent to a formaterData function.
    function showTickets() {
        $.get("/showTickets", function (data){
            formaterData(data);
        })
    }
    //Here we decide the structure of the output. And this is the final step for returning the html
    function formaterData(tickets){
        let ut = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
            "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
        for (const ticket of tickets){
            ut += "<tr><td>" + ticket.movieName + "</td><td>" + ticket.nrOfTickets + "</td><td>" +
                ticket.firstName + "</td><td>" + ticket.lastName + "</td><td>" + ticket.phoneNumber +
                "</td><td>" + ticket.emailAddress + "</td>";
        }
        ut += "</table>";
        $("#allTickets").html(ut);
    }

    $("#deleteTickets").click(function (){
        deleteAll();
    })

    //deleteAll calls the method in the "/deleteAll" url, which clears the array.
    //Then we call showTickets so we can show the empty array
    function deleteAll(){
        $.get("/deleteAll", function (){
            showTickets();
        })

    }
});