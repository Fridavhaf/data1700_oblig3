CREATE TABLE ticket(
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
   movie_name VARCHAR(255) NOT NULL,
   nr_of_tickets INTEGER NOT NULL,
   first_name    VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   phone_number CHAR(8) NOT NULL,
   email_address VARCHAR(255) NOT NULL
);
