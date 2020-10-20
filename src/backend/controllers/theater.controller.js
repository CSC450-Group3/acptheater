const Theater = require("../models/theater.model.js");

// Create a new theater 
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({
            message: "Theater content cannot be empty."
        });
    }

    // Create the theater object
    const theater = new Theater({
        theater_name: req.body.theater_name,
        theater_address: req.body.theater_address,
        theater_phone: req.body.theater_phone,
    });

    //Save the theater to the database
    Theater.create(theater, (err, data) => {
        if(err){
            res.status(500).send({
                message: "Failed to create theater: " + err.message + "."
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find theater by Id
exports.findOne = (req, res) => {
    Theater.findById(req.params.theater_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Theater not found with theater_id ${req.params.theater_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving theater with theater_id ${req.params.theater_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}

// Find theater by Id
exports.findAll = (req, res) => {
    Theater.getAll((err, data) => {
        if(err){
            res.send(500).send({
                message: `Could not retreive theaters: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
}

// Update an existing theater by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Theater content cannot be empty."
        });
    }

    Theater.updateById(
        req.params.theater_id,
        new Theater(req.body),
        (err, data) => {
            if(err){
                // Theater to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Theater not found with theater_id ${req.params.theater_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating theater with theater_id ${req.params.theater_id}.`
                    });
                }
            }
            // Theater udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete an existing theater by ID
exports.delete = (req, res) => {
    Theater.delete(req.params.theater_id, (err, data) => {
        if(err){
            // Theater to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Theater not found with theater_id ${req.params.theater_id}.`
                });
            }
            // Error encountered pefroming delete
            else{
                res.send(500).send({
                    message: `Could not delete theater with theater_id ${req.params.theater_id}.` 
                });
            }
        }
        // Theater deleted successfully
        else{
            res.send({message: `Theater was deleted successfully.`})
        }
    });
}