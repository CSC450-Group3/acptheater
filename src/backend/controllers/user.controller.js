const User = require("../models/user.model.js");

// Create a new user 
exports.create = (req, res) => {
    //Validate the request
    if(!req.body){
        res.status(400).send({
            message: "User content cannot be empty."
        });
    }

    // Create the user object
    const user = new User({
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        middle_name: req.body.middle_name,
        birthday: req.body.birthday,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        disabled: req.body.disabled
    });

    //Save the user to the database
    User.create(user, (err, data) => {
        if(err){
            res.status(500).send({
                message: "Failed to create user: " + err.message + "."
            });
        }
        else{
            res.send(data);
        }
    });
};

// Find user by Id
exports.findOne = (req, res) => {
    User.findById(req.params.user_id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `User not found with user_id ${req.params.user_id}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error retreiving user with user_id ${req.params.user_id}.`
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
    //Validate the request
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    // Create the user object
    const credentials = new Object({
        email: req.body.email,
        password: req.body.password
    });

    User.validateCredentials(credentials, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: "User not found with the given credentials."
                });
            }
            else{
                res.status(500).send({
                    message: "Error retreiving user."
                });
            }
        }
        else{
            res.send(data);
        }
    })
}

// Find user by email
exports.findByEmail = (req, res) => {
    User.getByEmail(req.params.email, (err, data) => {
        if(err){
                res.status(500).send({
                    message: `Error retreiving user with email ${req.params.email}.`
                });
        }
        else{
            res.send(data);
        }
    })
}

// Update an existing user by ID
exports.update = (req, res) =>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "User content cannot be empty."
        });
    }

    User.updateById(
        req.params.user_id,
        new User(req.body),
        (err, data) => {
            if(err){
                // User to update was not found
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `User not found with user_id ${req.params.user_id}.`
                    });
                }
                // Error encountered performing update
                else{
                    res.status(500).send({
                        message: `Error updating user with user_id ${req.params.user_id}.`
                    });
                }
            }
            // User udpated successfully
            else{
                res.send(data);
            }
        }
    );
};


// Delete an existing user by ID
exports.delete = (req, res) => {
    User.delete(req.params.user_id, (err, data) => {
        if(err){
            // User to delete was not found
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `User not found with user_id ${req.params.user_id}.`
                });
            }
            // Error encountered pefroming delete
            else{
                res.send(500).send({
                    message: `Could not delete user with user_id ${req.params.user_id}.` 
                });
            }
        }
        // User deleted successfully
        else{
            res.send({message: `User was deleted successfully.`})
        }
    });
}