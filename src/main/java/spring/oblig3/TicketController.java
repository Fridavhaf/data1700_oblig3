package spring.oblig3;

import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;

    private Logger logger = LoggerFactory.getLogger(TicketController.class);

    private boolean validateTicket(Ticket ticket) {
        //name regex from chatGPT
        String validName  = "^[\\p{L}\\p{M}'\\-]+(?: [\\p{L}\\p{M}'\\-]+)*$";
        //email regex from https://regexr.com/3e48o
        String validEmail = "^[\\w.-]+@[\\w-]+\\.[\\w-]{2,4}$";
        String validPnumber = "^[0-9]{8}$"; // Allows 8 digits
        String validAmount = "^[1-9][0-9]?$|^100$";
        String[] validMovies = {"Kung fu Panda", "Shrek", "Rottatouille"};

        boolean ticketValidFirstName = ticket.getFirst_name().matches(validName);
        boolean ticketValidLastName = ticket.getLast_name().matches(validName);
        boolean ticketValidEmail = ticket.getFirst_name().matches(validEmail);
        boolean ticketValidPnumber = ticket.getPhone_number().matches(validPnumber);
        boolean ticketValidNr = String.valueOf(ticket.getNr_of_tickets()).matches(validAmount);
        boolean ticketValidMovie = Arrays.asList(validMovies).contains(ticket.getMovie_name());
        if (ticketValidFirstName && ticketValidNr && ticketValidMovie &&
                ticketValidLastName && ticketValidPnumber && ticketValidEmail) {
            return true;
        }
        logger.error("Validation error");
        return false;
    }
    @PostMapping("/addTicketToDb")
    public void addTicketToDb(Ticket ticket, HttpServletResponse response) throws IOException {
        if (!ticketRepository.insertTicket(ticket)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
    }

    @GetMapping("/allTickets")
    public List<Ticket> allTickets(HttpServletResponse response) throws IOException {
        List<Ticket> allTickets = ticketRepository.getAllTickets();
        if (allTickets==null){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
        return allTickets;
    }

    @GetMapping("/ticketById")
    public Ticket ticketById(int id, HttpServletResponse response) throws IOException {
        Ticket ticket = ticketRepository.getTicketById(id);
        if(ticket==null){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
        return ticket;
    }

    @PostMapping("/updateTicketById")
    public void updateTicketById(Ticket ticket, HttpServletResponse response) throws IOException {
        if(!ticketRepository.updateTicket(ticket)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
    }

    @DeleteMapping("/deleteById")
    public void deleteById(int id, HttpServletResponse response) throws IOException {
        if(!ticketRepository.deleteTicketById(id)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
    }

    @DeleteMapping("/deleteAllInDb")
    public void deleteAllInDb(HttpServletResponse response) throws IOException {
        if(!ticketRepository.deleteAllTickets()){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
    }
}