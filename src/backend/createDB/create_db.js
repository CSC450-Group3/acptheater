const con = require('../db.config')

con.query("SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0", function (err, result) {
    if (err) throw err;
});

con.query("SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0", function (err, result) {
    if (err) throw err;
});

con.query("SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'", function (err, result) {
    if (err) throw err;
});

/* Schema acpTheater */
con.query("DROP SCHEMA IF EXISTS `acpTheater`", function (err, result) {
    if (err) throw err;
    console.log("Database dropped");
});

con.query("CREATE SCHEMA IF NOT EXISTS `acpTheater` DEFAULT CHARACTER SET utf8", function (err, result) {
    if (err) throw err;
    console.log("Database - acpTheater - created");
});

con.query("USE `acpTheater`", function (err, result) {
    if (err) throw err;
    console.log("Using acpTheater");
});

/* Table `acpTheater`.`Message` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`Message`", function (err, result) {
    if (err) throw err;
    console.log("Message table dropped");
});

con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`Message` ( " +
        " `message_id` INT NOT NULL AUTO_INCREMENT, " +
        " `thread_id` INT NOT NULL, " +
        " `sending_user_id` INT NOT NULL, " +
        " `message_body` BLOB NOT NULL, " +
        " `sent_date_time` DATETIME NOT NULL, " +
    " PRIMARY KEY (`message_id`), " +
    " CONSTRAINT `sending_user_id` " +
        " FOREIGN KEY (`sending_user_id`) " +
        " REFERENCES `acpTheater`.`User` (`user_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION, " +
    " CONSTRAINT `message_thread_id` " +
        " FOREIGN KEY (`thread_id`) " +
        " REFERENCES `acpTheater`.`Thread` (`thread_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("Message table created");
    });

con.query("CREATE INDEX `sending_user_id_idx` ON `acpTheater`.`Message` (`sending_user_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("Message table index sending_user_id_idx created");
});

con.query("CREATE INDEX `thread_id_idx` ON `acpTheater`.`Message` (`thread_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("Message table index thread_id_idx created");
});


/* Table `acpTheater`.`Movie` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`Movie`", function (err, result) {
    if (err) throw err;
    console.log("Movie table dropped");
});

con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`Movie` ( " +
        " `movie_id` INT NOT NULL AUTO_INCREMENT, " +
        " `title` VARCHAR(150) NOT NULL, " +
        " `director` VARCHAR(150) NULL, " +
        " `cast` BLOB NOT NULL, " +
        " `plot` BLOB NOT NULL, " +
        " `duration` INT(3) NOT NULL, " +
        " `rated` VARCHAR(5) NOT NULL, " +
        " `poster_URL` VARCHAR(200) NOT NULL, " +
        " `genre` VARCHAR(150) NOT NULL, " +
        " `release_date` DATE NOT NULL, " +
    " PRIMARY KEY (`movie_id`)) " +
    " ENGINE = InnoDB;", function (err, result) {
        if (err) throw err;
        console.log("Movie table created");
    });

/* Table `acpTheater`.`MovieTicket` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`MovieTicket`", function (err, result) {
    if (err) throw err;
    console.log("MovieTicket table dropped");
});

con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`MovieTicket` ( " +
        " `movie_ticket_id` INT NOT NULL AUTO_INCREMENT, " +
        " `transaction_id` INT NOT NULL, " +
        " `showing_id` INT NOT NULL, " +
        " `seat_id` INT NULL, " +
        " `total_viewers` INT NULL, " +
    " PRIMARY KEY (`movie_ticket_id`), " +
    " CONSTRAINT `ticket_seat_id` " +
        " FOREIGN KEY (`seat_id`) " +
        " REFERENCES `acpTheater`.`Seat` (`seat_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION, " +
    " CONSTRAINT `ticket_showing_id` " +
        " FOREIGN KEY (`showing_id`) " +
        " REFERENCES `acpTheater`.`Showing` (`showing_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION, " +
    " CONSTRAINT `ticket_transaction_id` " +
        " FOREIGN KEY (`transaction_id`) " +
        " REFERENCES `acpTheater`.`Transaction` (`transaction_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION) " +
    " ENGINE = InnoDB;", function (err, result) {
        if (err) throw err;
        console.log("MovieTicket table created");
});


con.query("CREATE INDEX `seat_id_idx` ON `acpTheater`.`MovieTicket` (`seat_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("MovieTicket index seat_id_idx");
});

con.query("CREATE INDEX `showing_id_idx` ON `acpTheater`.`MovieTicket` (`showing_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("MovieTicket index showing_id_idx created");
});

con.query("CREATE INDEX `transaction_id_idx` ON `acpTheater`.`MovieTicket` (`transaction_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("MovieTicket index transaction_id_idx created");
});


con.query("CREATE UNIQUE INDEX `seat_showing` ON `acpTheater`.`MovieTicket` (`showing_id` ASC, `seat_id` ASC) VISIBLE;", function (err, result) {
    if (err) throw err;
    console.log("MovieTicket unique index seat_showing created");
});


/* Table `acpTheater`.`Screen` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`Screen`", function (err, result) {
    if (err) throw err;
    console.log("Screen table dropped");
});


con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`Screen` ( " +
        " `screen_id` INT NOT NULL AUTO_INCREMENT, "+
        " `theater_id` INT NOT NULL, "+
        " `screen_name` VARCHAR(10) NOT NULL, " +
    " PRIMARY KEY (`screen_id`), " +
    " CONSTRAINT `screen_theater_id` " +
        " FOREIGN KEY (`theater_id`) " +
        " REFERENCES `acpTheater`.`Theater` (`theater_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("Screen table created");
});

con.query("CREATE INDEX `theater_id_idx` ON `acpTheater`.`Screen` (`theater_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("Screen index theater_id_idx created");
});


con.query("CREATE UNIQUE INDEX `theater_screen_name` ON `acpTheater`.`Screen` (`screen_name` ASC, `theater_id` ASC) VISIBLE;", function (err, result) {
    if (err) throw err;
    console.log("Screen unique index theater_screen_name created");
});


/* Table `acpTheater`.`Seat` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`Seat`", function (err, result) {
    if (err) throw err;
    console.log("Seat table dropped");
});

con.query("CREATE TABLE IF NOT EXISTS `acpTheater`.`Seat` (" +
        " `seat_id` INT NOT NULL AUTO_INCREMENT, " +
        " `screen_id` INT NOT NULL, " +
        " `row_name` VARCHAR(5) NOT NULL, " +
        " `seat_number` INT(3) NOT NULL, " +
        " `blocked` BIT NULL," +
        " `wheelchair` BIT NULL, " +
    " PRIMARY KEY (`seat_id`), " +
    " CONSTRAINT `seat_screen_id` " +
        " FOREIGN KEY (`screen_id`) " +
        " REFERENCES `acpTheater`.`Screen` (`screen_id`) " +
        " ON DELETE NO ACTION " +
        " ON UPDATE NO ACTION) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("Seat table created");
    });

con.query("CREATE INDEX `screen_id_idx` ON `acpTheater`.`Seat` (`screen_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("Seat index screen_id_idx created");
});

con.query("CREATE UNIQUE INDEX `screen_seat` ON `acpTheater`.`Seat` (`screen_id` ASC, `row_name` ASC, `seat_number` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("Seat unique index screen_seat created");
});


/* Table `acpTheater`.`Showing` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`Showing`", function (err, result) {
    if (err) throw err;
    console.log("Showing table dropped");
});

con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`Showing` ( " +
        " `showing_id` INT NOT NULL AUTO_INCREMENT, " +
        " `screen_id` INT NOT NULL, " +
        " `movie_id` INT NOT NULL, " +
        " `start_date_time` DATETIME NOT NULL, " +
        " `cancelled` BIT(1) NULL, " +
        " `price` DECIMAL(6,2) NOT NULL, " +
    " PRIMARY KEY (`showing_id`), " +
    " CONSTRAINT `showing_screen_id` " +
        " FOREIGN KEY (`screen_id`) " +
        " REFERENCES `acpTheater`.`Screen` (`screen_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION, " +
    " CONSTRAINT `showingl_movie_id` " +
        " FOREIGN KEY (`movie_id`) " +
        " REFERENCES `acpTheater`.`Movie` (`movie_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("Showing table created");
    });

con.query("CREATE INDEX `screen_id_idx` ON `acpTheater`.`Showing` (`screen_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("Showing index screen_id_idx created");
});


con.query("CREATE INDEX `movie_id_idx` ON `acpTheater`.`Showing` (`movie_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("Showing index movie_id_idx created");
});


/* Table `acpTheater`.`Theater` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`Theater`", function (err, result) {
    if (err) throw err;
    console.log("Theater table dropped");
});

con.query("CREATE TABLE IF NOT EXISTS `acpTheater`.`Theater` ( " +
        " `theater_id` INT NOT NULL AUTO_INCREMENT, " +
        " `theater_name` VARCHAR(100) NOT NULL, " +
        " `theater_address` VARCHAR(150) NOT NULL, " +
        " `theater_phone` VARCHAR(15) NOT NULL, " +
    " PRIMARY KEY (`theater_id`)) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("Theater table created");
    });



/* Table `acpTheater`.`Thread` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`Thread`", function (err, result) {
    if (err) throw err;
    console.log("Thread table dropped");
});

con.query(
    " CREATE TABLE IF NOT EXISTS `acpTheater`.`Thread` ( " +
        " `thread_id` INT NOT NULL AUTO_INCREMENT, " +
        " `resolved` BIT NULL, " +
        " `subject` VARCHAR(50) NOT NULL, " +
    " PRIMARY KEY (`thread_id`)) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("Thread table created");
    });



/* Table `acpTheater`.`ThreadParticipant` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`ThreadParticipant`", function (err, result) {
    if (err) throw err;
    console.log("ThreadParticipant table dropped");
});

con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`ThreadParticipant` ( " +
        " `user_id` INT NOT NULL, " +
        " `thread_id` INT NOT NULL, " +
    " PRIMARY KEY (`thread_id`, `user_id`), " +
    " CONSTRAINT `participant_user_id` " +
        " FOREIGN KEY (`user_id`) " +
        " REFERENCES `acpTheater`.`User` (`user_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION, " +
    " CONSTRAINT `participant_thread_id` " +
        " FOREIGN KEY (`thread_id`) " +
        " REFERENCES `acpTheater`.`Thread` (`thread_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("ThreadParticipant table created");
    });


con.query("CREATE INDEX `thread_id_idx` ON `acpTheater`.`ThreadParticipant` (`thread_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("ThreadParticipant index thread_id_idx created");
});


/* Table `acpTheater`.`Transaction` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`Transaction`", function (err, result) {
    if (err) throw err;
    console.log("Transaction table dropped");
});

con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`Transaction` ( " +
        " `transaction_id` INT NOT NULL AUTO_INCREMENT, " +
        " `user_id` INT NOT NULL, " +
        " `total_price` DECIMAL(6,2) NOT NULL, " +
    " PRIMARY KEY (`transaction_id`), " +
    " CONSTRAINT `transaction_user_id` " +
        " FOREIGN KEY (`user_id`) " +
        " REFERENCES `acpTheater`.`User` (`user_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("Transaction table created");
    });

con.query("CREATE INDEX `user_id_idx` ON `acpTheater`.`Transaction` (`user_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("ThreadParticipant index user_id_idx created");
});


/* Table `acpTheater`.`User` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`User`", function (err, result) {
    if (err) throw err;
    console.log("User table dropped");
});

con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`User` ( " +
        " `user_id` INT NOT NULL AUTO_INCREMENT, " +
        " `first_name` VARCHAR(100) NOT NULL, " +
        " `last_name` VARCHAR(100) NOT NULL, " +
        " `middle_name` VARCHAR(100) NULL, " +
        " `birthday` DATE NOT NULL," +
        " `email` VARCHAR(200) NOT NULL, " +
        " `password` VARCHAR(100) NOT NULL, " +
        " `type` CHAR(1) NOT NULL, " +
        " `disabled` BIT NULL, " +
    " PRIMARY KEY (`user_id`)) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("User table created");
    });

con.query("CREATE UNIQUE INDEX `email` ON `acpTheater`.`User` (`email` ASC) INVISIBLE", function (err, result) {
    if (err) throw err;
    console.log("User unique index email created");
});

/* Table `acpTheater`.`UserReadMessage` */
con.query("DROP TABLE IF EXISTS `acpTheater`.`UserReadMessage`", function (err, result) {
    if (err) throw err;
    console.log("UserReadMessage table dropped");
});

con.query(
    "CREATE TABLE IF NOT EXISTS `acpTheater`.`UserReadMessage` ( " +
        " `message_id` INT NOT NULL, " +
        " `user_id` INT NOT NULL, " +
        " `read_date_time` DATETIME NOT NULL, " +
    " PRIMARY KEY (`message_id`, `user_id`), " +
    " CONSTRAINT `read_user_id` " +
        " FOREIGN KEY (`user_id`) " +
        " REFERENCES `acpTheater`.`User` (`user_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION, " +
    " CONSTRAINT `read_message_id` " +
        " FOREIGN KEY (`message_id`) " +
        " REFERENCES `acpTheater`.`Message` (`message_id`) " +
        " ON DELETE CASCADE " +
        " ON UPDATE NO ACTION) " +
    " ENGINE = InnoDB", function (err, result) {
        if (err) throw err;
        console.log("UserReadMessage table created");
    });

con.query("CREATE INDEX `user_id_idx` ON `acpTheater`.`UserReadMessage` (`user_id` ASC) VISIBLE", function (err, result) {
    if (err) throw err;
    console.log("UserReadMessage index user_id_idx created");
    console.log("Database creation complete!");
});


con.query("SET SQL_MODE=@OLD_SQL_MODE", function (err, result) {
    if (err) throw err;
});

con.query("SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS", function (err, result) {
    if (err) throw err;
});

con.query("SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS", function (err, result) {
    if (err) throw err;
});