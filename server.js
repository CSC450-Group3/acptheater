//Import Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')

//Global Variables
const app = express()
const PORT = process.env.PORT || 5000


//Connect DB
const db = require('./src/backend/db.config')
db.on('error', console.error.bind(console, 'database connection error:'))

//Import API Routes
const messageRoutes = require("./src/backend/routes/message.routes.js")
const movieRoutes = require("./src/backend/routes/movie.routes.js")
const seatRoutes = require("./src/backend/routes/seat.routes.js")
const screenRoutes = require("./src/backend/routes/screen.routes.js")
const showingRoutes = require("./src/backend/routes/showing.routes.js")
const theaterRoutes = require("./src/backend/routes/theater.routes.js")
const threadRoutes = require("./src/backend/routes/thread.routes.js")
const ticketRoutes = require("./src/backend/routes/ticket.routes.js")
const transactionRoutes = require("./src/backend/routes/transaction.routes.js")
const userRoutes = require("./src/backend/routes/user.routes.js")

//Configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/message', messageRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/seat', seatRoutes);
app.use('/api/screen', screenRoutes);
app.use('/api/showing', showingRoutes);
app.use('/api/theater', theaterRoutes);
app.use('/api/thread', threadRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, 'build')))
app.set('build', path.join(__dirname, 'index.html'))
app .set('view engine', 'ejs')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


module.exports = app; //Added for testing