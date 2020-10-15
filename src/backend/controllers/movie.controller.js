const Movie = require("../models/movie.model.js");

// Create a new movie
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({message: "Movie content cannot be empty."});
    }

    // Create the Movie object
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        cast: req.body.cast,
        plot: req.body.plot,
        duration: req.body.duration,
        rated: req.body.rated,
        poster_URL: req.body.poster_URL,
        genre: req.body.genre,
        release_date: req.body.release_date
    });

    //Save the movie to the database
    Movie.create(movie, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Failed to create movie: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find movie by Id
exports.findOne = (req, res) => {
    Movie.findById(req.params.movie_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Movie not found with movie_id ${req.params.movie_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving movie with movie_id ${req.params.movie_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}

// Get all movies 
exports.findAll = (req, res) => {
    Movie.getAll((err, data) => {
        if(err){
            res.send(500).send({
                message: `Could not retreive movies: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    })
}


// Delete a specific movie by ID
exports.delete = (req, res) => {
    Movie.delete(req.params.movie_id, (err, data) => {
        if(err){
            // Movie to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Movie not found with movie_id ${req.params.movie_id}.`
                });
            }
            // Error encountered pefroming delete
            else{
                res.status(500).send({
                    message: `Could not delete movie with movie_id ${req.params.movie_id}.`
                });
            }
        }
        // Movie deleted successfully
        else{
            res.send({message: `Movie was deleted successfully.`})
        }
    });
}