const Thread = require("../models/thread.model.js");

// Create a new thread
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({message: "Thread content cannot be empty."});
    }

    // Create the thread object
    const thread = new Thread({
        subject: req.body.subject,
        resolved: req.body.resolved,
        user_id: req.body.user_id
    });

    
    //Save the thread to the database
    Thread.create(thread, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Failed to create thread: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find thread by Id
exports.findOne = (req, res) => {
    Thread.findById(req.params.thread_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Thread not found with thread_id ${req.params.thread_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving thread with thread_id ${req.params.thread_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}


// Get all purchased threads by user_id
exports.findAllByUser = (req, res) => {
    Thread.getAllByUser(req.params.user_id, req.params.includeResolved, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error retreiving thread for user_id ${req.params.user_id}.`
            });
        }
        else{
            res.send(data);
        }
    })
}

//Get all thread records
exports.findAll = (req, res) => {
    Thread.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message: "Error retreiving threads"
            });
        }
        else{
            res.send(data);
        }
    })
}

// Update an existing thread by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Thread content cannot be empty."
        });
    }

    Thread.updateById(
        req.params.thread_id,
        new Thread(req.body),
        (err, data) => {
            if(err){
                // Thread user to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Thread not found with thread_id ${req.params.thread_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating thread with thread_id ${req.params.thread_id}.`
                    });
                }
            }
            // Thread udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete a thread by ID
exports.delete = (req, res) => {
    Thread.delete(req.params.thread_id, err => {
        if(err){
            // Thread to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Thread not found with thread_id ${req.params.thread_id}.`
                });
            }
            // Error encountered performing delete
            else{
                res.status(500).send({
                    message: `Could not delete thread with thread_id ${req.params.thread_id}.`
                });
            }
        }
        // Thread deleted successfully
        else{
            res.send({message: `Thread was deleted successfully.`})
        }
    });
}