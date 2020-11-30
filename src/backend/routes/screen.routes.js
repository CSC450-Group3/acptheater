  
const express = require('express')
const screen = require("../controllers/screen.controller.js"); 
const router = express.Router()

// Create a new screen 
router.post("/create", screen.create);

// Get all screens
router.get("/getAll", screen.findAll);

// Get screen by screen_id
router.get("/:screen_id", screen.findOne);

// Get screen by screen_id
router.get("/date/:date", screen.findAvailable);

// Update screen with a given screen_id
router.put("/:screen_id/update", screen.update);

// Delete screen by screen_id
router.delete("/:screen_id/delete", screen.delete);

module.exports = router