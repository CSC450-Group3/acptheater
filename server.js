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
const showingRoutes = require("./src/backend/routes/showing.routes.js")
const threadRoutes = require("./src/backend/routes/thread.routes.js")
const ticketRoutes = require("./src/backend/routes/ticket.routes.js")
const transactionRoutes = require("./src/backend/routes/transaction.routes.js")
const userRoutes = require("./src/backend/routes/user.routes.js")

//Configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/message', messageRoutes);
app.use('/movie', movieRoutes);
app.use('/showing', showingRoutes);
app.use('/thread', threadRoutes);
app.use('/ticket', ticketRoutes);
app.use('/transaction', transactionRoutes);
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, 'build')))
app.set('build', path.join(__dirname, 'index.html'))
app .set('view engine', 'ejs')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


module.exports = app; //Added for testing