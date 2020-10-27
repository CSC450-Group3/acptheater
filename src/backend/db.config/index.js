var mysql = require('mysql');
require('dotenv').config()

// setup connection information
var connection;
if(process.env.NODE_ENV ==='production' && process.env.JAWSDB_URL){
    // connection to JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else{
    // connect locally
    connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });
} 

// connect to mysql database
connection.connect(err => {
   if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    //console.log('connected to the mysql successefully with threadID: ' + connection.threadId);
})

module.exports = connection

