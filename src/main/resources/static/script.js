
$(function (){
    showTickets();
    $("#registerTicket").click(function () {
        $("#deletedOne").html("");
        $("#deletedAll").html("");

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
                movie_name: movie,
                nr_of_tickets: number,
                first_name: fName,
                last_name: lName,
                phone_number: pNumber,
                email_address: email
            }
            console.log(ticket);
            //We call the PostMapping with the url that adds object to array.
            // ticket (object we made) is the in-parameter.
            // We want showTickets executed once the request is completed
            $.post("/addTicketToDb", ticket, function () {
                showTickets();
            })
            .fail(function (jqXHR){
                const json = $.parseJSON(jqXHR.responseText);
                $("#errorTicket").html(json.message);

            });

            //clearing input fields
            $("#fName").val("");
            $("#lName").val("");
            $("#movie").val("");
            $("#nrOfTickets").val("");
            $("#pNumber").val("");
            $("#email").val("");
        }
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


function showTickets() {
    $.get("/allTickets", function (data) {
        formaterData(data);
    })
    .fail(function (jqXHR){
        const json = $.parseJSON(jqXHR.responseText);
        $("#errorTicket").html(json.message);
    });
}

//Here we decide the structure of the output. And this is the final step for returning the html
function formaterData(tickets) {
    let ut = "<table class='table2 table table-striped'>" +
        "<tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
    for (const ticket of tickets) {
        ut += "<tr><td>" + ticket.movie_name + "</td><td>" + ticket.nr_of_tickets + "</td><td>" +
            ticket.first_name + "</td><td>" + ticket.last_name + "</td><td>" + ticket.phone_number +
            "</td><td>" + ticket.email_address + "</td>" +
            "<td><button class='btn btn-danger delete_ticket' data-id='" + ticket.id + "'>Slett billett</button></td>" +
            "<td><button class='btn btn-primary edit_ticket' data-id='" + ticket.id + "'>Rediger</button></td></tr>"
        ;
    }
    ut += "</table>";
    $("#allTickets").html(ut);

    $(".delete_ticket").click(function () {
        let id = $(this).data("id");
        deleteTicket(id);
        console.log(id);
    });
    $(".edit_ticket").click(function () {
        let id = $(this).data("id");
        window.location.href = "editTicket.html?id=" + id;
    });

    $("#deleteTickets").click(function (){
        deleteAll();
    })


}

function deleteTicket(id) {
    $.ajax({
        url: '/deleteById',
        type: 'DELETE',
        data: { id: id }, // Pass the ticket ID as data
        success: function (result) {
            // Display success message
            $("#deletedOne").html("Suksess! Billett er slettet.")
            // Optionally, reload the page or refresh the ticket list
            showTickets();
        },
        error: function (xhr, status, error) {
            // Handle error response
            console.error("Error deleting ticket:", error);
            // Display error message
            alert("An error occurred while deleting the ticket");
        }
    });
}

function deleteAll(){
    $.ajax({
        url: '/deleteAllInDb',
        type: 'DELETE',
        success: function (result) {
            // Display success message
            $("#deletedAll").html("<br>Suksess! Alle billetter er slettet.<br>");
            showTickets();
        },
        error: function (xhr, status, error) {
            // Handle error response
            console.error("Error deleting all tickets:", error);
            // Display error message
            alert("An error occurred while deleting the tickets");
        }
    });
};

