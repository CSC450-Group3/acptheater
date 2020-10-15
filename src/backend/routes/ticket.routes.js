  
const express = require('express')
const ticket = require("../controllers/ticket.controller.js"); 
const router = express.Router()

// Create a new ticket
router.post("/create", ticket.create);

// Update ticket with a given ticket_id
router.get("/showing/:showing_id", ticket.findAllByShowing);

// Get ticket by ticket_id
router.get("/:ticket_id", ticket.findOne);

// Update ticket with a given ticket_id
router.put("/:ticket_id/update", ticket.update);

// Delete ticket by ticket_id
router.delete("/:ticket_id/delete", ticket.delete);

module.exports = router