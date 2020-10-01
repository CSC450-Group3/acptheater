
/*
    Execute this in mysql workbench before running the program. 
    There are issues with the new mysql authentication protocols that require this to be executed.

    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

 */

var mysql = require('mysql');
var config = require('../config');

// setup connection information
var connection;
if(process.env.JAWSDB_URL){
    // connection to JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else{
    // connect locally
    connection = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });
} 

// connect to mysql database
connection.connect(err => {
   if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
 
    console.log('connected to the mysql successefully with threadID: ' + connection.threadId);
})

module.exports = connection

