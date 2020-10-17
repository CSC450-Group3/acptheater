  
const express = require('express')
const transaction = require("../controllers/transaction.controller.js"); 
const router = express.Router()

// Create a new transaction
router.post("/create", transaction.create);

// Get transaction by transaction_id
router.get("/:transaction_id", transaction.findOne);

// Get active movie transactions by user
router.get("/user/:user_id/upcoming", transaction.findUpcomingByUser);

// Get active movie transactions by user
router.get("/user/:user_id/active", transaction.findActiveByUser);

// Get upcoming movie transactions by user
router.get("/user/:user_id", transaction.findAllByUser);

// Update transaction with a given transaction_id
router.put("/:transaction_id/update", transaction.update);

// Delete transaction by transaction_id
router.delete("/:transaction_id/delete", transaction.delete);

module.exports = router