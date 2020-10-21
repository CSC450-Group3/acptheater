  
const express = require('express')
const showing = require("../controllers/showing.controller.js"); 
const router = express.Router()

// Create a new showing
router.post("/create", showing.create);

// Get all upcoming movies that will be showing
router.get("/upcoming", showing.findUpcoming);

// Get showing by showing_id
router.get("/:showing_id", showing.findOne);

// Get showing by date
router.get("/date/:date", showing.findByDate);


// Update showing with a given showing_id
router.put("/:showing_id/update", showing.update);

// Delete showing by showing_id
router.delete("/:showing_id/delete", showing.delete);

module.exports = router