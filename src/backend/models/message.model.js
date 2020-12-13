var sql = require('../db.config')

//Message object constructor
var Message = function(message){
    this.thread_id = message.thread_id;
    this.sending_user_id = message.sending_user_id;
    this.message_body = message.message_body;
};

// Create new message record
// UTC_TIMESTAMP because we are storing in universal time
Message.create = (newMessage, result) => {
    sql.query(`INSERT INTO message(thread_id, sending_user_id, message_body, sent_date_time) ` + 
        `VALUES(${newMessage.thread_id}, ${newMessage.sending_user_id}, '${newMessage.message_body}', UTC_TIMESTAMP())`, 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Message created successfully
        result(null, { message_id: res.insertId, ...newMessage });

        // Create the UserReadMessage record for the user creating the message
        sql.query(`INSERT INTO userreadmessage (message_id, user_id, read_date_time) ` +
        `VALUES(${res.insertId}, ${newMessage.sending_user_id}, UTC_TIMESTAMP())`, err => {
            //Error encountered
            if(err){

                result(err, null);
                return;
            }
    
            //UserReadMessage record created successfully
            //console.log(`Created UserReadMessage with message_id: ${res.insertId} , user_id: ${newMessage.sending_user_id}`);
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
                result(err, null);
                return;
            }
             
             //Message participant created successfully or already exists
            //console.log(`Message participant with thread_id: ${newMessage.thread_id} , user_id: ${newMessage.sending_user_id}`);
         });
    });
};


// Find message by ID
//Subtract 6 hours from UTC to get to CST
Message.findById = (message_id, result) => {
    sql.query("SELECT thread_id, sending_user_id, CAST(message_body AS CHAR) AS body, DATE_FORMAT(date_sub(sent_date_time, interval 6 hour), '%c/%e/%Y %r') AS sent_date_time " +
                "FROM message " +
                "WHERE message_id = ? ", 
    [message_id],
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // Message is found 
        if(res.length){
            result(null, res[0]);
            return;
        }

        // Message not found
        result({kind: "not_found"}, null);
    });
};

// Find all messages by thread_id
//subtract 6 hours to get UTC to CST
Message.findByThread = (thread_id, accessing_user_id, result) => {
    sql.query(
        "SELECT t.subject, m.message_id, t.resolved, m.sending_user_id, u.first_name, u.last_name, CAST(m.message_body AS CHAR) as body, " +
        " DATE_FORMAT(date_sub(m.sent_date_time, interval 6 hour), '%c/%e/%Y %r') AS sent_date_time, date_sub(m.sent_date_time, interval 6 hour) AS sort_date " +
        " FROM thread t " + 
            " INNER JOIN message m on m.thread_id = t.thread_id " +
            " INNER JOIN user u on u.user_id = m.sending_user_id " +
        " WHERE t.thread_id = ? " +
        " ORDER BY sort_date ", 
    [thread_id],
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // Messages found 
        if(res.length){
            //find new messages in the thread
            sql.query(
                `SELECT DISTINCT m.message_id, m.thread_id, m.sending_user_id, m.message_body,  DATE_FORMAT(date_sub(m.sent_date_time, interval 6 hour), '%c/%e/%Y %r') AS sent_date_time
                FROM thread t  
                    INNER JOIN threadparticipant tp ON tp.thread_id = t.thread_id AND t.thread_id = ${thread_id} 
                    INNER JOIN message m on m.thread_id = t.thread_id AND m.sending_user_id != ${accessing_user_id} 
                    INNER JOIN userreadmessage urm1 ON urm1.message_id = m.message_id 
                    LEFT JOIN userreadmessage urm2 ON urm2.message_id = m.message_id AND urm1.user_id != urm2.user_id 
                    INNER JOIN user u1 ON u1.user_id = urm1.user_id AND u1.user_id = m.sending_user_id
                    LEFT JOIN user u2 ON u2.user_id = urm2.user_id AND u2.type != u1.type 
                WHERE (u2.user_id is null)`, 
            (err, res2) => {
                //Error encountered
                if(err){
                    result(err, null);
                    return;
                }

                // New messages found 
                if(res2.length){
                    for(i = 0; i < res2.length; i++){
                        var message_id = res2[i].message_id;
                        //Create User Read Message record for the message if it doesn't already exist
                        // UTC_TIMESTAMP because we are storing in universal time
                        sql.query(
                            `INSERT INTO userreadmessage(message_id, user_id, read_date_time) 
                            SELECT * FROM ( SELECT ${message_id} AS message_id , ${accessing_user_id} AS user_id, UTC_TIMESTAMP() AS read_date_time) AS tmp  
                            WHERE NOT EXISTS(
                                SELECT message_id, user_id FROM userreadmessage WHERE user_id = ${accessing_user_id} AND message_id = ${message_id}
                            ) LIMIT 1`,
                        err => {
                            //Error encountered
                            if(err){
                                result(err, null);
                                return;
                            }
                        });
                    }
                }
            });      

            result(null, res);
            return;
        }

        //Message not found
        result({kind: "not_found"}, null);
    });
};

// New Messages by User
//subtract 6 hours to get UTC to CST
Message.findNewMessagesByUser = (user_id, user_type, result) => {
    var sqlString;

    //user is admin
    if(user_type == 'A'){
        // find all new messages for administrator from all threads
        sqlString = `SELECT DISTINCT t.thread_id, t.subject, m.message_id, t.resolved, u1.first_name, u1.last_name, CAST(m.message_body AS CHAR) AS body, DATE_FORMAT(date_sub(m.sent_date_time, interval 6 hour), '%c/%e/%Y %r') AS sent_date_time 
                        FROM thread t  
                            INNER JOIN message m ON m.thread_id = t.thread_id AND m.sending_user_id != ${user_id}
                            INNER JOIN userreadmessage urm1 ON urm1.message_id = m.message_id  
                            LEFT JOIN userreadmessage urm2 ON urm2.message_id = m.message_id AND urm1.user_id != urm2.user_id 
                            INNER JOIN user u1 ON u1.user_id = urm1.user_id  AND u1.user_id = m.sending_user_id
                            LEFT JOIN user u2 ON u2.user_id = urm2.user_id AND u2.type != u1.type 
                        WHERE (u2.user_id is null) `;
    }
    //user is a customer
    else{
        // find all new messages for only the threads that the customer has participated in (only threads they would have created)
        sqlString = `SELECT DISTINCT t.thread_id, t.subject, m.message_id, t.resolved, u1.first_name, u1.last_name, CAST(m.message_body AS CHAR) AS body, DATE_FORMAT(date_sub(m.sent_date_time, interval 6 hour), '%c/%e/%Y %r') AS sent_date_time 
                    FROM thread t  
                        JOIN threadparticipant tp ON tp.thread_id = t.thread_id AND tp.user_id = ${user_id}
                        INNER JOIN message m ON m.thread_id = t.thread_id AND m.sending_user_id != ${user_id}
                        INNER JOIN userreadmessage urm1 ON urm1.message_id = m.message_id 
                        LEFT JOIN userreadmessage urm2 ON urm2.message_id = m.message_id AND urm1.user_id != urm2.user_id 
                        INNER JOIN user u1 ON u1.user_id = urm1.user_id  AND u1.user_id = m.sending_user_id
                        LEFT JOIN user u2 ON u2.user_id = urm2.user_id AND u2.type != u1.type 
                    WHERE (u2.user_id is null) `
    }

    sql.query(sqlString, (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // New messages found or no new messages to find
        result(null, res);

    });
};

// Update an existing Message by ID
Message.updateById = (message_id, message, result) => {
    sql.query(`UPDATE message SET message_body = '${message.message_body}' WHERE message_id = ${message_id}`, 
    (err, res) => {
            //Error encountered
            if(err){
                result(null, err);
                return;
            }

            // No message found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //Message updated successfully
            result(null, {message_id: message_id, ...message});
        }
    );
}

// Delete an existing message by ID
Message.delete = (message_id, result) => {
    sql.query("DELETE FROM message WHERE message_id = ?", message_id, (err, res) =>{
        //Error encountered
        if(err){
            result(null, err);
            return;
        }

        // No message found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // Message deleted successfully
        result(null, res);
    });
}

module.exports = Message;


