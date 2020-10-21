  
const express = require('express')
const message = require("../controllers/message.controller.js"); 
const router = express.Router()

// Create a new message
router.post("/create", message.create);

// Get all messages for a given thread
router.get("/thread/:thread_id/user/:accessing_user_id", message.findAllByThread);


// Get all messages for a given thread
router.get("/new/user/:user_id/type/:user_type", message.findNew);

// Get message by message_id
router.get("/:message_id", message.findOne);

// Update message with a given ticket_id
router.put("/:message_id/update", message.update);

// Delete message by message_id
router.delete("/:message_id/delete", message.delete);

module.exports = router