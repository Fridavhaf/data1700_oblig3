package spring.oblig3;

public class Ticket {
    private String movieName;
    private int nrOfTickets;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String emailAddress;
    private Integer id;

    public Ticket(String movieName, int nrOfTickets, String firstName, String lastName,
                  String phoneNumber, String emailAddress) {
        this.movieName = movieName;
        this.nrOfTickets = nrOfTickets;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
    }

    public Ticket() { }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public int getNrOfTickets() {
        return nrOfTickets;
    }

    public void setNrOfTickets(int nrOfTickets) {
        this.nrOfTickets = nrOfTickets;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
}
