//Reference: https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2
//Reference: https://bezkoder.com/node-js-rest-api-express-mysql/#Define_the_Model

var sql = require('../db.config')

//Movie object constructor
var Movie = function(movie){
    this.title = movie.title;
    this.director = movie.director; //optional
    this.cast = movie.cast;
    this.plot = movie.plot;
    this.duration = movie.duration;
    this.rated = movie.rated;
    this.poster_URL = movie.poster_URL;
    this.genre = movie.genre;
    this.release_date = movie.release_date;
};

Movie.create = (newMovie, result) => {
    sql.query("INSERT INTO movie SET ?", newMovie, (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, { movie_id: res.insertId, ...newMovie });
    });
};

Movie.findById = (movie_id, result) => {
    sql.query(`SELECT movie_id, title, director, CAST(cast AS CHAR) AS cast, CAST(plot AS CHAR) AS plot, duration, rated, poster_URL, genre, release_date FROM movie WHERE movie_id = ${movie_id}`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        // movie is found 
        if(res.length){
            result(null, res[0]);
            return;
        }

        //movie not found
        result({kind: "not_found"}, null);
    });
};


// Get all movie records by showing date
Movie.getByDate = (date, result) => {
    sql.query(
        "SELECT DISTINCT m.movie_id, m.title, m.director, CAST(m.cast AS CHAR) AS cast, CAST(m.plot AS CHAR) AS plot, m.duration, m.rated, m.poster_URL, m.genre, " +
        "DATE_FORMAT(m.release_date, '%c/%e/%Y') AS release_date " +
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


Movie.getAll = result => {
    sql.query("Select movie_id, title, director, CAST(cast AS CHAR) AS cast, CAST(plot AS CHAR) AS plot, duration, rated, poster_URL, genre, release_date from movie", (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Movie.delete = (movie_id, result) => {
    sql.query("DELETE FROM movie WHERE movie_id = ?", movie_id, (err, res) =>{
        // Error encountered
        if(err){
            result(null, err);
            return;
        }
        
        // No movie found with given ID
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
        }

        // Movie deleted successfully
        result(null, res);
        return;
    });
}

module.exports = Movie;