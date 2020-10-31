var sql = require('../db.config')

//Showing object constructor
var Showing = function(showing){
    this.screen_id = showing.screen_id;
    this.movie_id = showing.movie_id;
    this.start_date_time = showing.start_date_time;
    this.cancelled = showing.cancelled 
    this.price = showing.price
};

// Create new showing record
Showing.create = (newShowing, result) => {
    sql.query("INSERT INTO showing SET ?", newShowing, (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Showing created successfully
        result(null, { showing_id: res.insertId, ...newShowing });
    });
};


// Find showing By ID
Showing.findById = (showing_id, result) => {
    sql.query( 
            `SELECT s.showing_id, m.title, m.director, CAST(m.cast AS CHAR), CAST(m.plot AS CHAR), m.duration, m.rated, m.poster_URL, m.genre, 
                DATE_FORMAT(m.release_date, '%c/%e/%Y') AS release_date, DATE_FORMAT(s.start_date_time, '%c/%e/%Y %r') AS start_date_time 
            FROM  showing s 
                INNER JOIN movie m ON m.movie_id = s.movie_id 
            WHERE showing_id =  ${showing_id}`, 
        (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // Showing is found 
        if(res.length){
            result(null, res[0]);
            return;
        }

        //Showing not found
        result({kind: "not_found"}, null);
    });
};

// Get all showing records by date
Showing.getByDate = (date, result) => {
    sql.query(
        "SELECT s.*, m.title, m.director, CAST(m.cast AS CHAR), CAST(m.plot AS CHAR), m.duration, m.rated, m.poster_URL, m.genre, " +
        "DATE_FORMAT(m.release_date, '%c/%e/%Y') AS release_date, DATE_FORMAT(s.start_date_time, '%c/%e/%Y %r') AS start_date_time " +
        "FROM  showing s " +
        "INNER JOIN movie m ON m.movie_id = s.movie_id " +
        "WHERE CAST(s.start_date_time AS DATE) = ?", 
    [date], 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }
        
        //Showing found
        result(null, res);
    });
};

// Get upcoming movies showing (movies not currently playing, but scheduled in the future)
Showing.getUpcoming = result => {
    sql.query(
            "SELECT DISTINCT  m.title, m.director, CAST(m.cast as CHAR), CAST(m.plot as CHAR), m.duration, m.rated, m.poster_URL, " +
                "m.genre, DATE_FORMAT(m.release_date, '%c/%e/%Y'), s.showing_id, DATE_FORMAT(s.start_date_time, '%c/%e/%Y %r') AS start_date_time  " +
            "FROM  showing s " +
            "INNER JOIN movie m on m.movie_id = s.movie_id " +
            "WHERE CAST(start_date_time AS DATE) > NOW() " + 
            "AND s.movie_id NOT IN ( SELECT DISTINCT movie_id " +
                "FROM showing " +
                "WHERE CAST(start_date_time AS DATE) = CAST(NOW() AS DATE)"+
            ")", 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Future showings found
        result(null, res);
    });
};


// Update an existing showing by ID
Showing.updateById = (showing_id, showing, result) => {
    sql.query(
        "UPDATE showing SET screen_id = ?, movie_id = ? , start_date_time = ?, cancelled = ?, price = ? WHERE showing_id = ?",
        [showing.screen_id, showing.movie_id, showing.start_date_time, showing.cancelled, showing.price, showing_id],
        (err, res) => {
            //Error encountered
            if(err){
                result(null, err);
                return;
            }

            // No showing found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //Showing updated successfully
            result(null, {showing_id: showing_id, ...showing});
        }
    );
}

// Delete an existing showing by ID
Showing.delete = (showing_id, result) => {
    sql.query("DELETE FROM showing WHERE showing_id = ?", showing_id, (err, res) =>{
        //Error encountered
        if(err){
            result(null, err);
            return;
        }

        // No showing found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // Showing deleted successfully
        result(null, res);
    });
}

module.exports = Showing;