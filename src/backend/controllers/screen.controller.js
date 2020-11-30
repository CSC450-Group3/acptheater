const Screen = require("../models/screen.model.js");

// Create a new screen 
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({
            message: "Screen content cannot be empty."
        });
    }

    // Create the screen object
    const screen = new Screen({
        theater_id: req.body.theater_id,
        screen_name: req.body.screen_name
    });

    //Save the screen to the database
    Screen.create(screen, (err, data) => {
        if(err){
            res.status(500).send({
                message: "Failed to create screen: " + err.message + "."
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find screen by Id
exports.findOne = (req, res) => {
    Screen.findById(req.params.screen_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Screen not found with screen_id ${req.params.screen_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving screen with screen_id ${req.params.screen_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}


// Find available screens by date
exports.findAvailable = (req, res) => {
    Screen.findAvailable(req.params.date, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error retreiving screen with screen_id ${req.params.screen_id}.`
            });  
        }
        else{
            res.send(data);
        }
    })
}

// Find screen by Id
exports.findAll = (req, res) => {
    Screen.getAll((err, data) => {
        if(err){
            res.send(500).send({
                message: `Could not retreive screens: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
}


// Update an existing screen by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Screen content cannot be empty."
        });
    }

    Screen.updateById(
        req.params.screen_id,
        new Screen(req.body),
        (err, data) => {
            if(err){
                // Screen to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Screen not found with screen_id ${req.params.screen_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating screen with screen_id ${req.params.screen_id}.`
                    });
                }
            }
            // Screen udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete an existing screen by ID
exports.delete = (req, res) => {
    Screen.delete(req.params.screen_id, (err, data) => {
        if(err){
            // Screen to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Screen not found with screen_id ${req.params.screen_id}.`
                });
            }
            // Error encountered pefroming delete
            else{
                res.send(500).send({
                    message: `Could not delete screen with screen_id ${req.params.screen_id}.` 
                });
            }
        }
        // Screen deleted successfully
        else{
            res.send({message: `Screen was deleted successfully.`})
        }
    });
}