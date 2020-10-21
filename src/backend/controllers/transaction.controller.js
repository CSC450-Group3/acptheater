const Transaction = require("../models/transaction.model.js");

// Create a new transaction
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({message: "Transaction content cannot be empty."});
    }

    // Create the transaction object
    const transaction = new Transaction({
        user_id: req.body.user_id,
        total_price: req.body.total_price
    });

    
    //Save the transaction to the database
    Transaction.create(transaction, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Failed to create transaction: ${err.message}.`
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find transaction by Id
exports.findOne = (req, res) => {
    Transaction.findById(req.params.transaction_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Transaction not found with transaction_id ${req.params.transaction_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving transaction with transaction_id ${req.params.transaction_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}



// Find all user transactions by user_id
exports.findAllByUser = (req, res) => {
    Transaction.getAllByUser(req.params.user_id, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error retreiving transactions for user ${req.params.user_id}.`
            });
        }
        else{
            res.send(data);
        }
    })
}

// Find all user transactions by user_id
exports.findUpcomingByUser = (req, res) => {
    Transaction.getUpcomingTicketsByUser(req.params.user_id, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error retreiving transactions for user ${req.params.user_id}.`
            });
        }
        else{
            res.send(data);
        }
    })
}

// Get active transactions by user_id
exports.findActiveByUser = (req, res) => {
    Transaction.getActiveTicketsByUser(req.params.user_id, (err, data) => {
        if(err){
            res.status(500).send({
                message: `Error retreiving transactions for user ${req.params.user_id}.`
            });
        }
        else{
            res.send(data);
        }
    })
}

// Update an existing transaction by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Transaction content cannot be empty."
        });
    }

    Transaction.updateById(
        req.params.transaction_id,
        new Transaction(req.body),
        (err, data) => {
            if(err){
                // Transaction to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Transaction not found with transaction_id ${req.params.transaction_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating transaction with transaction_id ${req.params.transaction_id}.`
                    });
                }
            }
            // Transaction udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete a transaction by ID
exports.delete = (req, res) => {
    Transaction.delete(req.params.transaction_id, (err, data) => {
        if(err){
            // Transaction to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Transaction not found with transaction_id ${req.params.transaction_id}.`
                });
            }
            // Error encountered performing delete
            else{
                res.status(500).send({
                    message: `Could not delete transaction with transaction_id ${req.params.transaction_id}.`
                });
            }
        }
        // Transaction deleted successfully
        else{
            res.send({message: `Transaction was deleted successfully.`})
        }
    });
}