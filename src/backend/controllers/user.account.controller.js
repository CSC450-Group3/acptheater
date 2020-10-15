const UserAccount = require("../models/user.account.model.js");

// Create a new user account
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({
            message: "User Account content cannot be empty."
        });
    }

    // Create the user account object
    const userAccount = new UserAccount({
        user_id: req.body.user_id,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        disabled: req.body.disabled
    });

    //Save the user account to the database
    UserAccount.create(userAccount, (err, data) => {
        if(err){
            res.status(500).send({
                message: "Failed to create user account: " + err.message + "."
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find user account by Id
exports.findOne = (req, res) => {
    UserAccount.findById(req.params.user_account_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `User account not found with user_account_id ${req.params.user_account_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving user account with user_account_id ${req.params.user_account_id}.`
                });
            }
        }
        else{
            res.send(data);
        }
    })
}

// Validate User login
exports.validate = (req, res) => {
    UserAccount.validateCredentials(req.params.email, req.params.password, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: "User account not found with the given credentials."
                });
            }
            else{
                res.status(500).send({
                    message: "Error retreiving user account."
                });
            }
        }
        else{
            res.send(data);
        }
    })
}

// Update an existing user account by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "User Account content cannot be empty."
        });
    }

    UserAccount.updateById(
        req.params.user_account_id,
        new UserAccount(req.body),
        (err, data) => {
            if(err){
                // User account to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `User account not found with user_account_id ${req.params.user_account_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating user account with user_account_id ${req.params.user_account_id}.`
                    });
                }
            }
            // User account udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete an existing user account by ID
exports.delete = (req, res) => {
    UserAccount.delete(req.params.user_account_id, (err, data) => {
        if(err){
            // User account to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `User account not found with user_account_id ${req.params.user_account_id}.`
                });
            }
            // Error encountered pefroming delete
            else{
                res.send(500).send({
                    message: `Could not delete user with user_account_id ${req.params.user_account_id}.` 
                });
            }
        }
        // User account deleted successfully
        else{
            res.send({message: `User account was deleted successfully.`})
        }
    });
}