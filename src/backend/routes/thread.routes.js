  
const express = require('express')
const thread = require("../controllers/thread.controller.js"); 
const router = express.Router()

// Create a new thread
router.post("/create", thread.create);

// Get all threads for a given user
// Option to include or not include the resolved threads (pass true or false)
router.get("/user/:user_id/includeResolved/:includeResolved", thread.findAllByUser);

// Get all threads -- administrator view
router.get("/getAll", thread.findAll);

// Get thread by thread_id
router.get("/:thread_id", thread.findOne);

// Update thread with a given thread_id
router.put("/:thread_id/update", thread.update);

// Delete thread by thread_id
router.delete("/:thread_id/delete", thread.delete);

module.exports = router