const con = require('../db.config')


con.query("USE `acptheater`", function (err, result) {
    if (err) throw err;
});


con.query("DROP procedure IF EXISTS `createSeats`", function (err, result) {
    if (err) throw err;
});

/**
 * createSeats stored procedure
 * INT screenID
 * INT number_of_rows
 * INT number_of_columns
 * 
 * Creates the seats for that screen for the entered number of rows and columns
 */
con.query("CREATE PROCEDURE `createSeats`(screenID INT, number_of_rows INT, number_of_columns INT) "+
    "BEGIN " +
	    "DECLARE r INT; " +
        "DECLARE c INT; " +
        "SET r = 1; " +
        "createRow: WHILE r <= number_of_rows DO " +
		    "SET c = 1; " +
		    "createColumn: WHILE c <= number_of_columns DO " +
			    "INSERT INTO seat(screen_id, row_name, seat_number) " +
			    "VALUES(screenID, " +
				    "(CASE  r " +
                        "WHEN 1 THEN 'A' " +
                        "WHEN 2 THEN 'B' " +
                        "WHEN 3 THEN 'C' " +
                        "WHEN 4 THEN 'D' " +
                        "WHEN 5 THEN 'E' " +
                        "WHEN 6 THEN 'F' " +
                        "WHEN 7 THEN 'G' " +
                        "WHEN 8 THEN 'H' " +
                        "WHEN 9 THEN 'I' " +
                        "WHEN 10 THEN 'J' " +
                        "WHEN 11 THEN 'K' " +
                        "WHEN 12 THEN 'L' " +
                        "WHEN 13 THEN 'M' " +
                        "WHEN 14 THEN 'N' " +
                        "WHEN 15 THEN 'O' " +
                        "WHEN 16 THEN 'P' " +
                        "WHEN 17 THEN 'Q' " +
                        "WHEN 18 THEN 'R' " +
                        "WHEN 19 THEN 'S' " +
                        "WHEN 20 THEN 'T' " +
                        "WHEN 21 THEN 'U' " +
                        "WHEN 22 THEN 'V' " +
                        "WHEN 23 THEN 'W' " +
                        "WHEN 24 THEN 'X' " +
                        "WHEN 25 THEN 'Y' " +
                        "ELSE 'Z' " +
				    "END), " +
				"CAST(c AS CHAR(10))); " +
			    "SET c = c + 1; " +
            "END WHILE createColumn; " +
            "SET r = r + 1; " +
	    "END WHILE createRow; " +
    "END;", function (err, result) {
    if (err) throw err;
    console.log("createSeats Stored Procedure Created")
});


con.query("DROP procedure IF EXISTS `createScreens`", function (err, result) {
    if (err) throw err;
});


/**
 * createScreens stored procedure
 * INT theaterID
 * INT number_of_screens
 * INT num_rows
 * INT num_columns
 * 
 * Builds the entered number of screens for a given theater location
 * Then calls the createSeats procuefure to create the seats for the build screen
 */
con.query(
    "CREATE PROCEDURE `createScreens` (theaterID INT, number_of_screens INT, num_rows INT, num_columns INT) " +
        "BEGIN " +
	        "DECLARE screen INT; " +
            "SET screen = 1; " +
    
            "createScreen: WHILE screen <= number_of_screens DO " +
                "INSERT INTO screen(theater_id, screen_name) " +
                "values(theaterID, CAST(screen AS CHAR(10))); " +

                "SET @VarID = (SELECT LAST_INSERT_ID()); " +
                "CALL createSeats(@VarID, num_rows, num_columns); " +
                
                "SET screen = screen + 1; " +
            "END WHILE createScreen; " +
        "END;", function (err, result) {
    if (err) throw err;
    console.log ("createScreens Stored Procedure created")
});


/* Populate the Movie Theater location */
con.query("INSERT INTO theater(theater_name, theater_address, theater_phone)" +
    "VALUES('Aragog Cinema','1234 Hidden Rd, Minneapolis, MN 55444' , '(555) 555-1234');", 
    function (err, result) {
    if (err) throw err;
    console.log("Theater created")
});

con.query("SET @VarID = (SELECT LAST_INSERT_ID());", function (err, result) {
    if (err) throw err;
});

/* Create the screens and seats*/
con.query("CALL createScreens(@VarID , 6, 10, 20);", function (err, result) {
    if (err) throw err;
    console.log("Screens and Seats created.")
});

/* Create an  user */
con.query("INSERT INTO user(first_name, last_name, birthday, email, password, type) " +
    "VALUES('System', 'Administrator', '1980-01-01','admin@acpTheater.com', SHA1('P@ssw0rd'), 'A');", function (err, result) {
    if (err) throw err;
    console.log("Admin user created")
});

con.query("SET @VarID = (SELECT LAST_INSERT_ID());", function (err, result) {
    if (err) throw err;
});

