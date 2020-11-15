const Showing = require("../models/showing.model.js");

// Create a new showing
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({message: "Showing content cannot be empty."});
    }

    // Create the showing object
    const showing = new Showing({
        screen_id: req.body.screen_id,
        movie_id: req.body.movie_id,
        start_date_time: req.body.start_date_time,
        cancelled: req.body.cancelled,
        price: req.body.price
    });

    //Save the showing to the database
    Showing.create(showing, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Failed to create showing: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find Showing by Id
exports.findOne = (req, res) => {
    Showing.findById(req.params.showing_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Showing not found with showing_id ${req.params.showing_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving showing with showing_id ${req.params.showing_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}



// Find all showings by date
exports.findByDate = (req, res) => {
    Showing.getByDate(req.params.date, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No showings found for date ${req.params.date}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving showing for date ${req.params.date}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}


//find all dates with showings on or after the given date
exports.findShowingDates = (req, res) => {
    Showing.getShowingDates(req.params.date, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error retreiving showing for date ${req.params.date}.`
            });
        }
        else{
            res.send(data);
        }
    })
}

// Find all upcoming tickets by user
exports.findUpcoming = (req, res) => {
    Showing.getUpcoming((err, data) => {
        if(err){
            res.send(500).send({
                message: `Could not retreive showing: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    })
}



// Update an existing showing by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Showing content cannot be empty."
        });
    }

    Showing.updateById(
        req.params.showing_id,
        new Showing(req.body),
        (err, data) => {
            if(err){
                // Showing to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Showing not found with showing_id ${req.params.showing_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating showing with showing_id ${req.params.showing_id}.`
                    });
                }
            }
            // Showing udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete a specific showing by ID
exports.delete = (req, res) => {
    Showing.delete(req.params.showing_id, (err, data) => {
        if(err){
            // Showing to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Showing not found with showing_id ${req.params.showing_id}.`
                });
            }
            // Error encountered performing delete
            else{
                res.status(500).send({
                    message: `Could not delete showing with showing_id ${req.params.showing_id}.`
                });
            }
        }
        // Showing deleted successfully
        else{
            res.send({message: `Showing was deleted successfully.`})
        }
    });
}