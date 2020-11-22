var sql = require('../db.config')

//screen object constructor
var Screen = function(screen){
    this.theater_id = screen.theater_id;
    this.screen_name = screen.screen_name;
};

// Create new screen record
Screen.create = (newScreen, result) => {
    sql.query("INSERT INTO screen SET ? ", [newScreen], (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //screen created successfully
        result(null, { screen_id: res.insertId, ...newScreen});
    });
};


// Find screen By ID
Screen.findById = (screen_id, result) => {
    sql.query(`SELECT * FROM screen WHERE screen_id = ${screen_id}`, (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // screen is found 
        if(res.length){
            result(null, res[0]);
            return;
        }

        //screen not found
        result({kind: "not_found"}, null);
    });
};

// Find available screens on a given date
// subtract 6 hours to convert back to CST before removing the timestamp
Screen.findAvailable = (date, result) => {
    sql.query(
        `SELECT * , 
            CASE WHEN sc.screen_id IN (Select sc1.screen_id
                FROM screen sc1
                JOIN showing sh ON sh.screen_id = sc1.screen_id 
                WHERE CAST( date_sub(sh.start_date_time, interval 6 hour) AS DATE) = '${date}'
            )
            THEN 1 
            ELSE 0 
            END AS disabled
        FROM screen sc 
        `, 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
};


// Find all screens
Screen.getAll = result => {
    sql.query("Select * FROM screen", (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Screens found
        result(null, res);
    });
};

// Update an existing screen by ID
Screen.updateById = (screen_id, screen, result) => {
    sql.query(
        `UPDATE screen 
            SET screen_name = '${screen.screen_name}'
        WHERE screen_id = ${screen_id}`,
        (err, res) => {
            //Error encountered
            if(err){
                result(null, err);
                return;
            }

            // No screen found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //screen updated successfully
            result(null, {screen_id: screen_id, ...screen});
        }
    );
}

// Delete an existing screen by ID
Screen.delete = (screen_id, result) => {
    sql.query("DELETE FROM screen WHERE screen_id = ?", screen_id, (err, res) =>{
        //Error encountered
        if(err){
            result(null, err);
            return;
        }

        // No screen found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // screen deleted successfully
        result(null, res);
    });
}

module.exports = Screen;