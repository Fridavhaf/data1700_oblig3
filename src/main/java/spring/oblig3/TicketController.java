package spring.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TicketController {

    @Autowired
    private TicketRepository rep;

    @PostMapping("/saveTicket")
    public void saveTicket(Ticket inTicket){
        rep.saveTicket(inTicket);
    }

    @GetMapping("/showTickets")
    public List<Ticket> showTickets (){
        return rep.getAllTickets();
    }

    @GetMapping("/deleteAll")
    public void deleteTickets (){
        rep.deleteAllTickets();
    }

}
