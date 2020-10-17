var sql = require('../db.config')

//Transaction object constructor
var Transaction = function(transaction){
    this.user_id = transaction.user_id;
    this.total_price = transaction.total_price
};

// Create new transaction record
Transaction.create = (newTransaction, result) => {
    sql.query("INSERT INTO transaction SET ?", newTransaction, (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Transaction created successfully
        console.log("Created transaction: ", {transaction_id: res.insertId, ...newTransaction});
        result(null, { transaction_id: res.insertId, ...newTransaction });
    });
};


// Find transaction By ID
Transaction.findById = (transaction_id, result) => {
    sql.query(
        "SELECT t.*, mt.total_viewers, sc.screen_name, st.seat_number, st.row_name, sh.start_date_time, m.title, m.duration " +
        "FROM transaction t " +
            "INNER JOIN movieticket mt on mt.transaction_id = t.transaction_id " +
            "INNER JOIN showing sh on sh.showing_id = mt.showing_id " + 
            "INNER JOIN screen sc on sc.screen_id = sh.screen_id " +
            "INNER JOIN movie m on m.movie_id = sh.movie_id " +
            "LEFT JOIN seat st on st.seat_id = mt.seat_id " +
        "WHERE t.transaction_id = ?", 
    [transaction_id],
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Transaction is found 
        if(res.length){
            console.log("found transaction: ", res[0]);
            result(null, res[0]);
            return;
        }

        //Transaction not found
        result({kind: "not_found"}, null);
    });
};

// Get all transaction records by user_id
Transaction.getAllByUser = (user_id, result) => {
    sql.query(
        "SELECT t.*, mt.total_viewers, sc.screen_name, st.seat_number, st.row_name, sh.start_date_time, m.title, m.duration " +
        "FROM transaction t " +
            "INNER JOIN movieticket mt on mt.transaction_id = t.transaction_id " +
            "INNER JOIN showing sh on sh.showing_id = mt.showing_id " + 
            "INNER JOIN screen sc on sc.screen_id = sh.screen_id " +
            "INNER JOIN movie m on m.movie_id = sh.movie_id " +
            "LEFT JOIN seat st on st.seat_id = mt.seat_id " +
        "WHERE t.user_id = ?", 
    [user_id], 
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        //Transaction found
        console.log("Tickets: ", res);
        result(null, res);
    });
};

// Get tickets for a user where the movie start time is in the future
Transaction.getUpcomingTicketsByUser = (user_id, result) => {
    sql.query(
        "SELECT t.*, mt.total_viewers, sc.screen_name, st.seat_number, st.row_name, sh.start_date_time, m.title, m.duration " +
        "FROM transaction t " +
            "INNER JOIN movieticket mt on mt.transaction_id = t.transaction_id " +
            "INNER JOIN showing sh on sh.showing_id = mt.showing_id " +
            "INNER JOIN screen sc on sc.screen_id = sh.screen_id " +
            "INNER JOIN movie m on m.movie_id = sh.movie_id " +
            "LEFT JOIN seat st on st.seat_id = mt.seat_id " +
        "WHERE t.user_id = ? " +
            "AND sh.start_date_time > NOW()",
    [user_id], 
    (err, res) => {

        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Future transactions found
        console.log("Upcoming ticket transactions: ", res);
        result(null, res);
    });
};


/* Get tickets for a user where the movie start time is now or in the past and the
 current time is within the duration of the movie */
 Transaction.getActiveTicketsByUser = (user_id, result) => {
    sql.query(
        "SELECT t.*, mt.total_viewers, sc.screen_name, st.seat_number, st.row_name, sh.start_date_time, m.title, m.duration " +
        "FROM transaction t " +
            "INNER JOIN movieticket mt on mt.transaction_id = t.transaction_id " +
            "INNER JOIN showing sh on sh.showing_id = mt.showing_id " +
            "INNER JOIN screen sc on sc.screen_id = sh.screen_id " +
            "INNER JOIN movie m on m.movie_id = sh.movie_id " +
            "LEFT JOIN seat st on st.seat_id = mt.seat_id " +
        "WHERE t.user_id = ? " +
            "AND sh.start_date_time <= NOW() " +
            "AND NOW() <= (sh.start_date_time + INTERVAL m.duration MINUTE)",
    [user_id], 
    (err, res) => {
        
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Future transactions found
        console.log("Active ticket transactions: ", res);
        result(null, res);
    });
};

// Update price of existing transaction by ID
Transaction.updateById = (transaction_id, transaction, result) => {
    sql.query(
        "UPDATE transaction " +
        "SET total_price = ? " +
        "WHERE transaction_id = ? ",
        [transaction.total_price, transaction_id],
        (err, res) => {
            //Error encountered
            if(err){
                console.log("error:", err);
                result(null, err);
                return;
            }

            // No trnasction found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //transaction updated successfully
            console.log("Updated transaction: ", {transaction_id: transaction_id, ...transaction});
            result(null, {transaction_id: transaction_id, ...transaction});
        }
    );
}

// Delete an existing transaction by ID
Transaction.delete = (transaction_id, result) => {
    sql.query("DELETE FROM transaction WHERE transaction_id = ?", transaction_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No transaction found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // Transaction deleted successfully
        console.log("deleted transaction with transaction_id: ", transaction_id);
        result(null, res);
    });
}

module.exports = Transaction;