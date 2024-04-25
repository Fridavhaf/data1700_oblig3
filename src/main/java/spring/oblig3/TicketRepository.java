package spring.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {
    @Autowired
    private JdbcTemplate db;

    //add ticket to database
    public void saveTicket(Ticket inTicket){
        String sql = "INSERT INTO Ticket (movieName, nrOfTickets, firstName, lastName, phoneNumber, emailAddress) VALUES(?,?,?,?,?,?)";
        db.update(sql, inTicket.getMovieName(), inTicket.getNrOfTickets(), inTicket.getFirstName(),
                inTicket.getLastName(), inTicket.getPhoneNumber(), inTicket.getEmailAddress());
    }

    //show tickets from database
    public List<Ticket> getAllTickets(){
        String sql = "SELECT * FROM Ticket ORDER BY lastName";
        List<Ticket> allTickets = db.query(sql, new BeanPropertyRowMapper(Ticket.class));
        return allTickets;
    }

    //delete methode, deleting all tickets in the database
    public void deleteAllTickets(){
        String sql = "DELETE FROM TICKET";
        db.update(sql);
    }
}
