$(function() {

    function getInfoById() {
        //We take the id parameter from the url
        let id = new URLSearchParams(window.location.search).get("id");
        $("#id").html(id);
        $.get("/ticketById?id=" + id, function (data) {
            $("#movie").val(data.movie_name);
            $("#nrOfTickets").val(data.nr_of_tickets);
            $("#fName").val(data.first_name);
            $("#lName").val(data.last_name);
            $("#pNumber").val(data.phone_number);
            $("#email").val(data.email_address);

        })
        .fail(function (jqXHR){
            const json = $.parseJSON(jqXHR.responseText);
            $("#errorTicket").html(json.message);
        });
    }

    getInfoById();


    $("#confirm").click(function () {
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
        if (lName !== null && fName !== null && movie !== null
            && email !== null && number !== null && pNumber !== null) {
            const ticket = {
                //These variables have to be the same as in the POJO
                id: $("#id").html(),
                movie_name: movie,
                nr_of_tickets: number,
                first_name: fName,
                last_name: lName,
                phone_number: pNumber,
                email_address: email
            }
            console.log(ticket.id);
            //We call the PostMapping with the url that adds object to array.
            // ticket (object we made) is the in-parameter.
            // We want showTickets executed once the request is completed
            //I ADDED DATA HERE
            $.post("/updateTicketById", ticket, function (){
                window.location.href = "index.html";
            })
            .fail(function (jqXHR){
                const json = $.parseJSON(jqXHR.responseText);
                $("#errorTicket").html(json.message);
            });
        }
    });
    $("#cancel").click(function (){
        window.location.href = "index.html";
    });
    $("#movie").change(function (){
        removeErrorMovie();
    });
    $("#nrOfTickets").change(function (){
        removeErrorNr();
    });
    $("#fName").change(function (){
        removeErrorFname();
    });
    $("#lName").change(function (){
        removeErrorLname();
    });
    $("#pNumber").change(function (){
        removeErrorPnumber();
    });
    $("#email").change(function (){
        removeErrorEmail();
    });
});
