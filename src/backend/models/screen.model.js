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
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //screen created successfully
        console.log("Created screen: ", {screen_id: res.insertId, ...newScreen});
        result(null, { screen_id: res.insertId, ...newScreen});
    });
};


// Find screen By ID
Screen.findById = (screen_id, result) => {
    sql.query(`Select * FROM screen WHERE screen_id = ${screen_id}`, (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // screen is found 
        if(res.length){
            console.log("found screen: ", res[0]);
            result(null, res[0]);
            return;
        }

        //screen not found
        result({kind: "not_found"}, null);
    });
};

// Find all screens
Screen.getAll = result => {
    sql.query("Select * FROM screen", (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Screens found
        console.log("Screens: ", res);
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
                console.log("error:", err);
                result(null, err);
                return;
            }

            // No screen found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //screen updated successfully
            console.log("updated screen: ", {screen_id: screen_id, ...screen});
            result(null, {screen_id: screen_id, ...screen});
        }
    );
}

// Delete an existing screen by ID
Screen.delete = (screen_id, result) => {
    sql.query("DELETE FROM screen WHERE screen_id = ?", screen_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No screen found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // screen deleted successfully
        console.log("deleted screen with screen_id: ", screen_id);
        result(null, res);
    });
}

module.exports = Screen;