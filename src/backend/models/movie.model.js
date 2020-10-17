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
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created movie: ", {movie_id: res.insertId, ...newMovie});
        result(null, { movie_id: res.insertId, ...newMovie });
    });
};

Movie.findById = (movie_id, result) => {
    sql.query(`Select title, director, CAST(cast as CHAR), CAST(plot as CHAR), duration, rated, poster_URL, genre, release_date FROM movie where movie_id = ${movie_id}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // movie is found 
        if(res.length){
            console.log("found movie: ", res[0]);
            result(null, res[0]);
            return;
        }

        //movie not found
        result({kind: "not_found"}, null);
    });
};


Movie.getAll = result => {
    sql.query("Select title, director, CAST(cast as CHAR), CAST(plot as CHAR), duration, rated, poster_URL, genre, release_date from movie", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("movies: ", res);
        result(null, res);
    });
};


Movie.delete = (movie_id, result) => {
    sql.query("DELETE FROM movie WHERE movie_id = ?", movie_id, (err, res) =>{
        // Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        // No movie found with given ID
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
        }

        // Movie deleted successfully
        console.log("deleted movie with movie_id: ", movie_id);
        result(null, res);
        return;
    });
}

module.exports = Movie;