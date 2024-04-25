CREATE TABLE ticket
(
    id      INTEGER AUTO_INCREMENT NOT NULL,
    movieName VARCHAR(255) NOT NULL,
    nrOfTickets INTEGER NOT NULL,
    firstName    VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber CHAR(8) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
