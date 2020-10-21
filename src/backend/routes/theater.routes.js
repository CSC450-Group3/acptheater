  
const express = require('express')
const path = require('path');
const theater = require("../controllers/theater.controller.js"); 
const router = express.Router()

// Create a new theater 
router.post("/create", theater.create);

// Get all theaters
router.get("/getAll", theater.findAll);

// Get theater by theater_id
router.get("/:theater_id", theater.findOne);

// Update theater with a given theater_id
router.put("/:theater_id/update", theater.update);

// Delete theater by theater_id
router.delete("/:theater_id/delete", theater.delete);

module.exports = router