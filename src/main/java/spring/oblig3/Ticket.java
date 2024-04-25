package spring.oblig3;

public class Ticket {
    private String movie_name;
    private Integer nr_of_tickets;
    private String first_name;
    private String last_name;
    private String phone_number;
    private String email_address;
    private Integer id;

    public Ticket(String movie_name, Integer nr_of_tickets, String first_name, String last_name,
                  String phone_number, String email_address) {
        this.movie_name = movie_name;
        this.nr_of_tickets = nr_of_tickets;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email_address = email_address;
    }

    public Ticket() { }

    public String getMovie_name() {
        return movie_name;
    }

    public void setMovie_name(String movie_name) {
        this.movie_name = movie_name;
    }

    public Integer getNr_of_tickets() {
        return nr_of_tickets;
    }

    public void setNr_of_tickets(Integer nr_of_tickets) {
        this.nr_of_tickets = nr_of_tickets;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getEmail_address() {
        return email_address;
    }

    public void setEmail_address(String email_address) {
        this.email_address = email_address;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
