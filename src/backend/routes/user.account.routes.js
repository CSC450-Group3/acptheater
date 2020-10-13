  
const express = require('express')
const path = require('path');
const userAccount = require("../controllers/user.account.controller.js"); 
const router = express.Router()

// Create a new user account
router.post("/create", userAccount.create);

// Validate user user account credentials
router.get("/email/:email/password/:password", userAccount.validate);

// Get user account by user_account_id
router.get("/:user_account_id", userAccount.findOne);

// Update user account with a given user_account_id
router.put("/:user_account_id/update", userAccount.update);

// Delete user by user_id
router.delete("/:user_account_id/delete", userAccount.delete);

module.exports = router