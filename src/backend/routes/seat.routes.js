  
const express = require('express')
const seat = require("../controllers/seat.controller.js"); 
const router = express.Router()

// Create a new seat 
router.post("/create", seat.create);

// Mass create seats 
router.post("/massCreate", seat.massCreate);

// Get all seats
router.get("/screen/:screen_id", seat.findAll);

// Get seat by seat_id
router.get("/:seat_id", seat.findOne);

// Update seat with a given seat_id
router.put("/:seat_id/update", seat.update);

// Delete all seats by screen_id
router.delete("/screen/:screen_id/delete", seat.deleteAll);

// Delete seat by seat_id
router.delete("/:seat_id/delete", seat.delete);

module.exports = router