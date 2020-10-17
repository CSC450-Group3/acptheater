const Message = require("../models/message.model.js");

// Create a new message
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({message: "Message content cannot be empty."});
    }

    // Create the message object
    const message = new Message({
        thread_id: req.body.thread_id,
        sending_user_id: req.body.sending_user_id,
        message_body: req.body.message_body
    });

    
    //Save the message to the database
    Message.create(message, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Failed to create message: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find message by Id
exports.findOne = (req, res) => {
    Message.findById(req.params.message_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Message not found with message_id ${req.params.message_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving message with message_id ${req.params.message_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}


// Find all messages for a given thread
exports.findAllByThread = (req, res) => {
    Message.findByThread(req.params.thread_id, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error retreiving message for thread_id ${req.params.thread_id}.`
            });
        }
        else{
            res.send(data);
        }
    })
}


// Update an existing message by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Message content cannot be empty."
        });
    }

    Message.updateById(
        req.params.message_id,
        new Message(req.body),
        (err, data) => {
            if(err){
                // Message to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Message not found with message_id ${req.params.message_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating message with message_id ${req.params.message_id}.`
                    });
                }
            }
            // Message udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete a message by ID
exports.delete = (req, res) => {
    Message.delete(req.params.message_id, err => {
        if(err){
            // Message to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Message not found with message_id ${req.params.message_id}.`
                });
            }
            // Error encountered performing delete
            else{
                res.status(500).send({
                    message: `Could not delete message with message_id ${req.params.message_id}.`
                });
            }
        }
        // Message deleted successfully
        else{
            res.send({message: `Message was deleted successfully.`})
        }
    });
}