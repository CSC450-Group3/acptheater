//Import Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')

//Global Variables
const app = express()
const PORT = process.env.PORT || 5000


//Connect DB
const db = require('./src/server/db')

app.use(express.static(path.join(__dirname, 'build')))
app.set('build', path.join(__dirname, 'index.html'))
app .set('view engine', 'ejs')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})




app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


module.exports = app; //Added for testing