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


// Find showing By Showing ID
Showing.getById = (showing_id, result) => {
    sql.query( 
            `SELECT s.showing_id, m.title, m.director, CAST(m.cast AS CHAR) AS cast, CAST(m.plot AS CHAR) AS plot, m.duration, m.rated, m.poster_URL, m.genre, 
                DATE_FORMAT(m.release_date, '%c/%e/%Y') AS release_date, DATE_FORMAT(s.start_date_time, '%c/%e/%Y %h:%i %p') AS start_date_time 
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


// Find Showings By Movie ID
Showing.getByMovie = (movie_id, result) => {
    sql.query( 
            `SELECT DISTINCT DATE_FORMAT(s.start_date_time, '%c/%e/%Y') AS date
            FROM  showing s 
                INNER JOIN movie m ON m.movie_id = s.movie_id 
            WHERE m.movie_id = ${movie_id} 
            AND CAST(start_date_time AS DATE)>= CAST(NOW() AS DATE)
            ORDER BY date ASC`, 
        (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // Showing(s) were found 
        if(res.length){
            result(null, res);
            return;
        }

        //Showings not found
        result({kind: "not_found"}, null);
    });
};


// Find showtime status by Movie ID and Date
Showing.getShowtimeStatus = (movie_id, date, result) => {
    sql.query( 
            `SELECT DISTINCT s.showing_id, DATE_FORMAT(s.start_date_time, '%c/%e/%Y') AS date, DATE_FORMAT(s.start_date_time, '%h:%i %p') AS time, s.start_date_time, s.price,
                CASE 
                    WHEN s.start_date_time <= NOW() THEN 1 
                    ELSE 0 
                END AS disabled
            FROM showing s 
                INNER JOIN movie m ON m.movie_id = s.movie_id  
            WHERE m.movie_id = ${movie_id} 
                AND CAST(start_date_time AS DATE) = '${date}'
            ORDER BY start_date_time ASC`, 
        (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // Showing(s) were found 
        if(res.length){
            result(null, res);
            return;
        }

        //Showings not found
        result({kind: "not_found"}, null);
    });
};

// Get all showing records by date
Showing.getByDate = (date, result) => {
    sql.query(
        "SELECT s.*, m.title, m.director, CAST(m.cast AS CHAR) AS cast, CAST(m.plot AS CHAR) AS plot, m.duration, m.rated, m.poster_URL, m.genre, " +
        "DATE_FORMAT(m.release_date, '%c/%e/%Y') AS release_date, DATE_FORMAT(s.start_date_time, '%c/%e/%Y %h:%i %p') AS start_date_time " +
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
            "SELECT DISTINCT  m.title, m.director, CAST(m.cast as CHAR) AS cast, CAST(m.plot as CHAR) AS plot, m.duration, m.rated, m.poster_URL, " +
                "m.genre, DATE_FORMAT(m.release_date, '%c/%e/%Y'), s.showing_id, DATE_FORMAT(s.start_date_time, '%c/%e/%Y %h:%i %p') AS start_date_time  " +
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


// Get the date of current and upcoming showings
Showing.getShowingDates = (date, result) => {
    sql.query(
            "SELECT DISTINCT  DATE_FORMAT(CAST(start_date_time AS DATE),'%c/%e/%Y' ) AS showing_date from showing " +
            "WHERE  CAST(start_date_time AS DATE) >= ?", 
    [date], (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //showing dates found
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