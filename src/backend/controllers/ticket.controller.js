const Ticket = require("../models/ticket.model.js");

// Create a new ticket
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({message: "Ticket content cannot be empty."});
    }

    // Create the ticket object
    const ticket = new Ticket({
        transaction_id: req.body.transaction_id,
        showing_id: req.body.showing_id,
        seat_id: req.body.seat_id,
        total_viewers: req.body.total_viewers
    });

    
    //Save the ticket to the database
    Ticket.create(ticket, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Failed to create ticket: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find ticket by Id
exports.findOne = (req, res) => {
    Ticket.findById(req.params.ticket_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Ticket not found with ticket_id ${req.params.ticket_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving ticket with ticket_id ${req.params.ticket_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}


// Find ticket by transaction_id
exports.findByTransaction = (req, res) => {
    Ticket.getByTransaction(req.params.transaction_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Ticket not found with transaction_id ${req.params.transaction_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving ticket with transaction_id ${req.params.transaction_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}


// Get all purchased tickets by showing_id
exports.findAllByShowing = (req, res) => {
    Ticket.getAllByShowing(req.params.showing_id, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error retreiving tickets for showing_id ${req.params.showing_id}.`
            });
        }
        else{
            res.send(data);
        }
    })
}

// Update an existing ticket by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Ticket content cannot be empty."
        });
    }

    Ticket.updateById(
        req.params.ticket_id,
        new Ticket(req.body),
        (err, data) => {
            if(err){
                // Ticket to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Ticket not found with ticket_id ${req.params.ticket_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating ticket with ticket_id ${req.params.ticket_id}.`
                    });
                }
            }
            // Ticket udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete a ticket by ID
exports.delete = (req, res) => {
    Ticket.delete(req.params.ticket_id, (err, data) => {
        if(err){
            // Ticket to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Ticket not found with ticket_id ${req.params.ticket_id}.`
                });
            }
            // Error encountered performing delete
            else{
                res.status(500).send({
                    message: `Could not delete ticket with ticket_id ${req.params.ticket_id}.`
                });
            }
        }
        // Ticket deleted successfully
        else{
            res.send({message: `Ticket was deleted successfully.`})
        }
    });
}