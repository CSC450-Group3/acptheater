const Seat = require("../models/seat.model.js");

// Create a new seat 
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({
            message: "Seat content cannot be empty."
        });
    }

    // Create the seat object
    const seat = new Seat({
        screen_id: req.body.screen_id,
        row_name: req.body.row_name,
        seat_number: req.body.seat_number,
        blocked: req.body.blocked,
        wheelchair: req.body.wheelchair
    });

    //Save the seat to the database
    Seat.create(seat, (err, data) => {
        if(err){
            res.status(500).send({
                message: "Failed to create seat: " + err.message + "."
            });
        }
        else{
            res.send(data);
        }
    });
};


// Mass create a seats by screen 
exports.massCreate = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({
            message: "Seat content cannot be empty."
        });
    }

    const data = new Object({
        rows: req.body.rows,
        columns: req.body.columns,
        screen_id: req.body.screen_id
    });

    //Save the seat to the database
    Seat.massCreate(data, (err, data) => {
        if(err){
            res.status(500).send({
                message: "Failed to create seats: " + err.message + "."
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find seat by Id
exports.findOne = (req, res) => {
    Seat.findById(req.params.seat_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Seat not found with seat_id ${req.params.seat_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving seat with seat_id ${req.params.seat_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}

// Find all seats by screen_id
exports.findAllByScreen = (req, res) => {
    Seat.getAllByScreen(req.params.screen_id, (err, data) => {
        if(err){
            res.send(500).send({
                message: `Could not retreive seats: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
}

// Find seat availability by showing_id
exports.findAllAvailability = (req, res) => {
    Seat.getAllAvailability(req.params.showing_id, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Could not retreive seats: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
}



// Update an existing seat by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Seat content cannot be empty."
        });
    }

    Seat.updateById(
        req.params.seat_id,
        new Seat(req.body),
        (err, data) => {
            if(err){
                // Seat to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Seat not found with seat_id ${req.params.seat_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating seat with seat_id ${req.params.seat_id}.`
                    });
                }
            }
            // Seat udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete an existing seat by ID
exports.delete = (req, res) => {
    Seat.delete(req.params.seat_id, (err, data) => {
        if(err){
            // Seat to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Seat not found with seat_id ${req.params.seat_id}.`
                });
            }
            // Error encountered pefroming delete
            else{
                res.send(500).send({
                    message: `Could not delete seat with seat_id ${req.params.seat_id}.` 
                });
            }
        }
        // Seat deleted successfully
        else{
            res.send({message: `Seat was deleted successfully.`})
        }
    });
}


// Delete all seats for a given screen
exports.deleteAll = (req, res) => {
    Seat.deleteAll(req.params.screen_id, (err, data) => {
        if(err){
            // Seat to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Seat not found with screen_id ${req.params.screen_id}.`
                });
            }
            // Error encountered pefroming delete
            else{
                res.send(500).send({
                    message: `Could not delete seat with screen_id ${req.params.screen_id}.` 
                });
            }
        }
        // Seat deleted successfully
        else{
            res.send({message: `Seats deleted successfully.`})
        }
    });
}