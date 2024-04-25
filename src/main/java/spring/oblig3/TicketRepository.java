package spring.oblig3;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TicketRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    Logger logger = LoggerFactory.getLogger(TicketRepository.class);

    class TicketRowMapper implements RowMapper<Ticket> {
        @Override
        public Ticket mapRow(ResultSet rs, int rowNum) throws SQLException {
            Ticket ticket = new Ticket();
            ticket.setId(rs.getInt("id"));
            ticket.setMovie_name(rs.getString("movie_name"));
            ticket.setNr_of_tickets(rs.getInt("nr_of_tickets"));
            ticket.setFirst_name(rs.getString("first_name"));
            ticket.setLast_name(rs.getString("last_name"));
            ticket.setPhone_number(rs.getString("phone_number"));
            ticket.setEmail_address(rs.getString("email_address"));
            return ticket;
        }
    }

    //Insert ticket to the database
    public boolean insertTicket(Ticket ticket) {
        String sql = "INSERT INTO ticket(movie_name, nr_of_tickets, first_name, last_name, phone_number, email_address) VALUES(?, ?, ?, ?, ?, ?)";
        try{
            jdbcTemplate.update(sql, ticket.getMovie_name(), ticket.getNr_of_tickets(),
                    ticket.getFirst_name(), ticket.getLast_name(), ticket.getPhone_number(), ticket.getEmail_address());
            return true;
        }
        catch (Exception e){
            logger.error("Error in insertTicket: "+e);
            return false;
        }
    }

    //Get all tickets
    public List<Ticket> getAllTickets(){
        String sql = "SELECT * FROM ticket ORDER BY last_name";
        try{
            List<Ticket> allTickets= jdbcTemplate.query(sql, new TicketRowMapper());
            return allTickets;
        }
        catch(Exception e){
            logger.error("Error in getAllTickets: "+e);
            return null;
        }
    }


    //Get ticket by id
    public Ticket getTicketById(int id) {
        String sql = "SELECT * FROM ticket WHERE id = ?";
        try {
            List<Ticket> allTickets = jdbcTemplate.query(sql, new TicketRowMapper(), id);
            return allTickets.get(0);
        } catch (Exception e) {
            logger.error("Error in getTicketById: " + e);
            return null;
        }
    }

    public boolean updateTicket(Ticket ticket) {
        String sql = "UPDATE ticket SET movie_name = ?, nr_of_tickets = ?, first_name = ?," +
                "last_name = ?, phone_number = ?, email_address = ? WHERE id = ?";
        try{
            jdbcTemplate.update(sql, ticket.getMovie_name(), ticket.getNr_of_tickets(),
                    ticket.getFirst_name(), ticket.getLast_name(), ticket.getPhone_number(),
                    ticket.getEmail_address(), ticket.getId());
            return true;
        }
        catch (Exception e){
            logger.error("Error in updateTicket: "+e);
            return false;
        }
    }

    public boolean deleteTicketById(int id) {
        String sql = "DELETE FROM ticket WHERE id = ?";
        try{
            jdbcTemplate.update(sql, id);
            return true;
        }
        catch (Exception e){
            logger.error("Error in deleteTicketById: "+e);
            return false;
        }
    }

    //delete methode, deleting all tickets in the database
    public boolean deleteAllTickets(){
        String sql = "DELETE FROM ticket";
        try {
            jdbcTemplate.update(sql);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }
}
