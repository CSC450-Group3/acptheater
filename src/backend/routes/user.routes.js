  
const express = require('express')
const path = require('path');
const user = require("../controllers/user.controller.js"); 
const router = express.Router()

// Create a new user 
router.post("/create", user.create);

// Validate user user credentials
router.get("/email/:email/password/:password", user.validate);

// Get user by user_id
router.get("/:user_id", user.findOne);

// Update user with a given user_id
router.put("/:user_id/update", user.update);

// Delete user by user_id
router.delete("/:user_id/delete", user.delete);

module.exports = router