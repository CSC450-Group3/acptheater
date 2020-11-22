var sql = require('../db.config')

//Ticket object constructor
var Ticket = function(ticket){
    this.transaction_id = ticket.transaction_id;
    this.showing_id = ticket.showing_id;
    this.seat_id = ticket.seat_id;
    this.total_viewers = ticket.total_viewers
};

// Create new Ticket record
Ticket.create = (newTicket, result) => {
    sql.query("INSERT INTO movieticket SET ?", newTicket, (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Ticket created successfully
        result(null, {movie_ticket_id: res.insertId, ...newTicket });
    });
};


// Find Ticket By ID
// subtract 6 hours to convert to CST
Ticket.findById = (movie_ticket_id, result) => {
    sql.query(
        "SELECT mt.*, st.*, DATE_FORMAT(date_sub(s.start_date_time, interval 6 hour), '%c/%e/%Y %r') AS start_date_time " +
        "FROM movieticket mt " +
        "INNER JOIN showing s ON s.showing_id = mt.showing_id " +
        "LEFT JOIN seat st ON st.seat_id = mt.seat_id " +
        "WHERE mt.movie_ticket_id = ?",
    [movie_ticket_id],
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // Ticket is found 
        if(res.length){
            result(null, res[0]);
            return;
        }

        //Ticket not found
        result({kind: "not_found"}, null);
    });
};

// Get all Ticket records by showing
// subtract 6 hours to convert to CST
Ticket.getAllByShowing = (showing_id, result) => {
    sql.query(
        "SELECT  mt.*, st.*, DATE_FORMAT(date_sub(s.start_date_time, interval 6 hour), '%c/%e/%Y %r') AS start_date_time  " +
        "FROM movieticket mt " +
        "INNER JOIN showing s ON s.showing_id = mt.showing_id " +
        "LEFT JOIN seat st ON st.seat_id = mt.seat_id " +
        "WHERE mt.showing_id = ?", 
    [showing_id], 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Ticket found
        result(null, res);
    });
};


// Update an existing Ticket by ID
Ticket.updateById = (movie_ticket_id, ticket, result) => {
    sql.query(
        "UPDATE movieticket SET seat_id = ?, total_viewers = ?  WHERE movie_ticket_id = ?",
        [ticket.seat_id, ticket.total_viewers, movie_ticket_id],
        (err, res) => {
            //Error encountered
            if(err){
                result(null, err);
                return;
            }

            // No ticket found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //ticket updated successfully
            result(null, {movie_ticket_id: movie_ticket_id, ...ticket});
        }
    );
}

// Delete an existing Ticket by ID
Ticket.delete = (movie_ticket_id, result) => {
    sql.query("DELETE FROM movieticket WHERE movie_ticket_id = ?", movie_ticket_id, (err, res) =>{
        //Error encountered
        if(err){
            result(null, err);
            return;
        }

        // No ticket found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // Ticket deleted successfully
        result(null, res);
    });
}

module.exports = Ticket;