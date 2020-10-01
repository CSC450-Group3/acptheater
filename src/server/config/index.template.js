var config = {
    /* 
        1. Create a new file called index.js in side config
        2. Copy and paste this file's contents into index.js
        3. Populated with your local database information 
    */
    db:{
        host: 'localhost',
        user: '<USERNAME that tipically is root>',
        database: '<DATABASE-NAME>',
        password: '<PASSWORD or just use null if youre working lcocally>'
    }
};

module.exports = config;
