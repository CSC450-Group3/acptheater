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
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Ticket created successfully
        console.log("Created movie ticket: ", {movie_ticket_id: res.insertId, ...newTicket});
        result(null, {movie_ticket_id: res.insertId, ...newTicket });
    });
};


// Find Ticket By ID
Ticket.findById = (movie_ticket_id, result) => {
    sql.query(
        "Select * " +
        "from movieticket mt " +
        "INNER JOIN showing s on s.showing_id = mt.showing_id " +
        "LEFT JOIN seat st on st.seat_id = mt.seat_id " +
        "WHERE mt.movie_ticket_id = ?",
    [movie_ticket_id],
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Ticket is found 
        if(res.length){
            console.log("found ticket: ", res[0]);
            result(null, res[0]);
            return;
        }

        //Ticket not found
        result({kind: "not_found"}, null);
    });
};

// Get all Ticket records by showing
Ticket.getAllByShowing = (showing_id, result) => {
    sql.query(
        "Select * " +
        "from movieticket mt " +
        "INNER JOIN showing s on s.showing_id = mt.showing_id " +
        "LEFT JOIN seat st on st.seat_id = mt.seat_id " +
        "where mt.showing_id = ?", 
    [showing_id], 
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Ticket found
        console.log("tickets: ", res);
        result(null, res);
    });
};


// Update an existing Ticket by ID
Ticket.updateById = (movie_ticket_id, ticket, result) => {
    sql.query(
        "Update movieticket SET seat_id = ?, total_viewers = ?  WHERE movie_ticket_id = ?",
        [ticket.seat_id, ticket.total_viewers, movie_ticket_id],
        (err, res) => {
            //Error encountered
            if(err){
                console.log("error:", err);
                result(null, err);
                return;
            }

            // No ticket found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //ticket updated successfully
            console.log("updated ticket: ", {movie_ticket_id: movie_ticket_id, ...ticket});
            result(null, {movie_ticket_id: movie_ticket_id, ...ticket});
        }
    );
}

// Delete an existing Ticket by ID
Ticket.delete = (movie_ticket_id, result) => {
    sql.query("DELETE FROM movieticket WHERE movie_ticket_id = ?", movie_ticket_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No ticket found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // Ticket deleted successfully
        console.log("deleted ticket with movie_ticket_id: ", movie_ticket_id);
        result(null, res);
    });
}

module.exports = Ticket;