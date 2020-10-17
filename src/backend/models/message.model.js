var sql = require('../db.config')

//Message object constructor
var Message = function(message){
    this.thread_id = message.thread_id;
    this.sending_user_id = message.sending_user_id;
    this.message_body = message.message_body;
};

// Create new message record
Message.create = (newMessage, result) => {
    sql.query(`INSERT INTO message(thread_id, sending_user_id, message_body, sent_date_time) ` + 
        `VALUES(${newMessage.thread_id}, ${newMessage.sending_user_id}, '${newMessage.message_body}', NOW())`, 
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Message created successfully
        console.log("Created message: ", {message_id: res.insertId, ...newMessage});
        result(null, { message_id: res.insertId, ...newMessage });

        // Create the UserReadMessage record for the user creating the message
        sql.query(`INSERT INTO userreadmessage (message_id, user_id, read_date_time) ` +
        `VALUES(${res.insertId}, ${newMessage.sending_user_id}, NOW())`, err => {
            //Error encountered
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }
    
            //UserReadMessage record created successfully
            console.log(`Created UserReadMessage with message_id: ${res.insertId} , user_id: ${newMessage.sending_user_id}`);
        });


         //Create thread participant record for user creating message if it doesn't already exist for the given thread
         sql.query(
            `INSERT INTO threadparticipant(thread_id, user_id) ` +
            `SELECT * FROM ( SELECT ${newMessage.thread_id} AS thread_id , ${newMessage.sending_user_id} AS user_id) AS tmp ` +
            `WHERE NOT EXISTS(` +
                `SELECT thread_id, user_id FROM threadparticipant WHERE user_id = ${newMessage.sending_user_id} AND thread_id = ${newMessage.thread_id}` +
            `) LIMIT 1`,
        err => {
             //Error encountered
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }
             
             //Message participant created successfully or already exists
            console.log(`Message participant with thread_id: ${newMessage.thread_id} , user_id: ${newMessage.sending_user_id}`);
         });
    });
};


// Find message by ID
Message.findById = (message_id, result) => {
    sql.query("SELECT thread_id, sending_user_id, CAST(message_body AS CHAR) AS body, sent_date_time FROM message WHERE message_id = ? ", 
    [message_id],
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Message is found 
        if(res.length){
            console.log("found message: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Message not found
        result({kind: "not_found"}, null);
    });
};

// Find all messages by thread_id
Message.findByThread = (thread_id, result) => {
    sql.query(
        "SELECT t.subject, m.message_id, t.resolved, u.first_name, u.last_name, CAST(m.message_body AS CHAR) as body, m.sent_date_time " +
        "FROM thread t " + 
            "INNER JOIN message m on m.thread_id = t.thread_id " +
            "INNER JOIN user u on ua.u.user_id = m.sending_user_id " +
        "WHERE t.thread_id = ? " +
        "ORDER BY m.sent_date_time", 
    [thread_id],
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Messages found 
        if(res.length){
            console.log("found messages: ", res);
            result(null, res);
            return;
        }

        //Message not found
        result({kind: "not_found"}, null);
    });
};

// Update an existing Message by ID
Message.updateById = (message_id, message, result) => {
    sql.query(`UPDATE message SET message_body = '${message.message_body}' WHERE message_id = ${message_id}`, 
    (err, res) => {
            //Error encountered
            if(err){
                console.log("error:", err);
                result(null, err);
                return;
            }

            // No message found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //Message updated successfully
            console.log("updated message: ", {message_id: message_id, ...message});
            result(null, {message_id: message_id, ...message});
        }
    );
}

// Delete an existing message by ID
Message.delete = (message_id, result) => {
    sql.query("DELETE FROM message WHERE message_id = ?", message_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No message found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // Message deleted successfully
        console.log("deleted message with message_id: ", message_id);
        result(null, res);
    });
}

module.exports = Message;