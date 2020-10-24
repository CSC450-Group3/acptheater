var sql = require('../db.config')

//Thread object constructor
var Thread = function(thread){
    this.subject = thread.subject;
    this.resolved = thread.resolved;
    this.user_id = thread.user_id;
};

// Create new thread record
// Threads are created as not being resolved by default
Thread.create = (newThread, result) => {
    sql.query(`INSERT INTO thread (subject, resolved) ` + 
        `VALUES('${newThread.subject}', 0)`, 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Thread created successfully
        result(null, { thread_id: res.insertId, ...newThread });

        //Create thread participant record for user creating thread
        sql.query(`INSERT INTO threadparticipant(thread_id, user_id) ` +
        `VALUES(${res.insertId}, ${newThread.user_id})`, (err, res2) => {
            //Error encountered
            if(err){
                result(err, null);
                return;
            }
    
            //Thread participant created successfully
            //console.log(`Created thread participant with thread_id: ${res.insertId} , user_id: ${newThread.user_id}`);
        });
    });
};


// Find  thread by ID
Thread.findById = (thread_id, result) => {
    sql.query(
        "SELECT t.* " +
        "FROM thread t " + 
        "WHERE thread_id = ?" , 
    [thread_id],
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // Thread is found 
        if(res.length){
            result(null, res[0]);
            return;
        }

        //Thread not found
        result({kind: "not_found"}, null);
    });
};

// Get thread records by user 
Thread.getAllByUser = (user_id, includeResolved,  result) => {
    var queryString;
    if(includeResolved === 'true'){
        queryString = "SELECT DISTINCT t.* " +
            "FROM thread t " +
                "INNER JOIN threadparticipant tp ON tp.thread_id = t.thread_id " +
            "WHERE tp.user_id = ? " +
            // Order the resolved threads to the bottom of the list
            "ORDER BY  t.resolved, t.thread_id "
    }else{
        queryString =  "SELECT DISTINCT t.* " +
        "FROM thread t " +
            "INNER JOIN threadparticipant tp ON tp.thread_id = t.thread_id " +
        "WHERE tp.user_id = ? " +
            // Only inlcude the non-resolved threads
            "AND t.resolved = 0 "
        "ORDER BY t.thread_id"
    }

    sql.query(queryString, [user_id], (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Threads found
        result(null, res);
    });
};

// Get all thread records
Thread.getAll = result => {
    sql.query(
        "SELECT t.* " +
        "FROM thread t " +
        "ORDER BY  ISNULL(t.resolved) DESC, t.thread_id ",
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Thread found
        result(null, res);
    });
};

// Update an existing Thread by ID
Thread.updateById = (thread_id, thread, result) => {
    sql.query("UPDATE thread SET subject = ?, resolved = ? WHERE thread_id = ?", [thread.subject, thread.resolved, thread_id],
    (err, res) => {
            //Error encountered
            if(err){
                result(null, err);
                return;
            }

            // No thread found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //Thread updated successfully
            result(null, {thread_id: thread_id, ...thread});
        }
    );
}

// Delete an existing thread by ID
Thread.delete = (thread_id, result) => {
    sql.query("DELETE FROM thread WHERE thread_id = ?", thread_id, (err, res) =>{
        //Error encountered
        if(err){
            result(null, err);
            return;
        }

        // No thread found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // Thread deleted successfully
        result(null, res);
    });
}

module.exports = Thread;