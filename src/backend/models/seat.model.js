var sql = require('../db.config')

//Seat object constructor
var Seat = function(seat){
    this.screen_id = seat.screen_id;
    this.row_name = seat.row_name;
    this.seat_number = seat.seat_number;
    this.blocked = seat.blocked;
    this.wheelchair = seat.wheelchair;
};

// Create new seat record
Seat.create = (newSeat, result) => {
    sql.query("INSERT INTO seat SET ? ", [newSeat], (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //seat created successfully
        console.log("Created seat: ", {seat_id: res.insertId, ...newSeat});
        result(null, { seat_id: res.insertId, ...newSeat});
    });
};


// Mass create seat for a screen_id
Seat.massCreate = (data, result) => {
    var values =[]; 
    //build the values to insert
    for(row = 0; row < data.rows; row++){
        //get the alpha character using ASCII value. 
        var rowName = String.fromCharCode(65 + row);
        for(col = 1; col <= data.columns; col++){
            values.push([data.screen_id, rowName, col])
        }// end column loop
    }// end row loop

    sql.query(
        "INSERT INTO seat(screen_id, row_name, seat_number) VALUES ?", [values], 
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //seat created successfully
        console.log("Created seats: ", {seats_created: res.affectedRows, screen_id: data.screen_id, rows: data.rows, columns: data.columns});
        result(null, { seats_created: res.affectedRows, screen_id: data.screen_id, rows: data.rows, columns: data.columns});
    });
};



// Find seat By ID
Seat.findById = (seat_id, result) => {
    sql.query(`SELECT * FROM seat WHERE seat_id = ${seat_id}`, (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // seat is found 
        if(res.length){
            console.log("found seat: ", res[0]);
            result(null, res[0]);
            return;
        }

        //seat not found
        result({kind: "not_found"}, null);
    });
};


// Find all seats by screen
Seat.getAllByScreen = (screen_id, result) => {
    sql.query(
        "SELECT * " +
        "FROM seat " +
        "WHERE screen_id = ? " +
        "ORDER BY row_name, seat_number ",
    [screen_id], (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Seats found
        console.log("Seats: ", res);
        result(null, res);
    });
};



// Find all seat availablibilty by showing_id
Seat.getAllAvailability = (showing_id, result) => {
    sql.query(
        "SELECT s.*, " +
                "CASE " +
                    "WHEN mt.movie_ticket_id IS NOT NULL THEN 1 " +
                    "ELSE 0  " +
                "END AS booked " +
        "FROM showing sh " +
            "INNER JOIN screen sc on sc.screen_id = sh.screen_id " +
            "INNER JOIN seat s on s.screen_id = sc.screen_id " + 
            "LEFT JOIN movieticket mt ON mt.seat_id = s.seat_id AND mt.showing_id = sh.showing_id " +
        "WHERE sh.showing_id = ? " +
        "ORDER BY row_name, seat_number ",
    [showing_id], (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Seats found
        console.log("Seats: ", res);
        result(null, res);
    });
};

// Update an existing seat by ID
Seat.updateById = (seat_id, seat, result) => {
    sql.query(
        `UPDATE seat 
            SET row_name = '${seat.row_name}',
                seat_number = ${seat.seat_number},
                blocked = ${seat.blocked},
                wheelchair = ${seat.wheelchair}
        WHERE seat_id = ${seat_id}`,
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error:", err);
            result(null, err);
            return;
        }

        // No seat found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return; 
        }

        //seat updated successfully
        console.log("updated seat: ", {seat_id: seat_id, ...seat});
        result(null, {seat_id: seat_id, ...seat});
    });
}

// Delete an existing seat by ID
Seat.delete = (seat_id, result) => {
    sql.query("DELETE FROM seat WHERE seat_id = ?", seat_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No seat found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // seat deleted successfully
        console.log("deleted seat with seat_id: ", seat_id);
        result(null, res);
    });
}



// Delete all seats for a screen_id
Seat.deleteAll = (screen_id, result) => {
    sql.query("DELETE FROM seat WHERE screen_id = ?", screen_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No seat found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // seat deleted successfully
        console.log("deleted seat with screen_id: ", screen_id);
        result(null, res);
    });
}
module.exports = Seat;