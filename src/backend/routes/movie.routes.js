  
const express = require('express')
const path = require('path');
const movie = require("../controllers/movie.controller.js"); 
const router = express.Router()

//Create a new Movie
router.post("/create", movie.create);

//Get all movies
router.get("/getAll", movie.findAll);

//Get movie by showing date
router.get("/date/:date", movie.findByDate);

//Get movie by ID
router.get("/:movie_id", movie.findOne);

//Delete movie by ID
router.delete("/:movie_id/delete", movie.delete);

module.exports = router