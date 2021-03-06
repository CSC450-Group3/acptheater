  
const express = require('express')
const showing = require("../controllers/showing.controller.js"); 
const router = express.Router()

// Create a new showing
router.post("/create", showing.create);

// Get all upcoming movies that will be showing
router.get("/upcoming", showing.findUpcoming);

// Get showing by showing_id
router.get("/:showing_id", showing.findOne);

// Get showing by movie_id
router.get("/movie/:movie_id", showing.findByMovie);

// Get showing by movie_id
router.get("/movie/:movie_id/date/:date", showing.findShowtimeStatus);

// Get showing by date
router.get("/date/:date", showing.findByDate);

// Get all date(s) for showings on or after a specified date
router.get("/dateList/date/:date", showing.findShowingDates);

// Update showing with a given showing_id
router.put("/:showing_id/update", showing.update);

// Delete showing by showing_id
router.delete("/:showing_id/delete", showing.delete);

module.exports = router