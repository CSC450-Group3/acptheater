var sql = require('../db.config')

//theater object constructor
var Theater = function(theater){
    this.theater_name = theater.theater_name;
    this.theater_address = theater.theater_address;
    this.theater_phone = theater.theater_phone;
};

// Create new theater record
Theater.create = (newTheater, result) => {
    sql.query("INSERT INTO theater SET ? ", [newTheater], (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //theater created successfully
        console.log("Created theater: ", {theater_id: res.insertId, ...newTheater});
        result(null, { theater_id: res.insertId, ...newTheater});
    });
};


// Find theater By ID
Theater.findById = (theater_id, result) => {
    sql.query(`SELECT * FROM theater WHERE theater_id = ${theater_id}`, (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // theater is found 
        if(res.length){
            console.log("found theater: ", res[0]);
            result(null, res[0]);
            return;
        }

        //theater not found
        result({kind: "not_found"}, null);
    });
};

// Find all theaters
Theater.getAll = (result) => {
    sql.query("SELECT * FROM theater", (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Theaters found
        console.log("Theaters: ", res);
        result(null, res);
    });
};

// Update an existing theater by ID
Theater.updateById = (theater_id, theater, result) => {
    sql.query(
        `UPDATE theater 
            SET theater_name = '${theater.theater_name}',
                theater_address = '${theater.theater_address}',
                theater_phone = '${theater.theater_phone}' 
        WHERE theater_id = ${theater_id}`,
        (err, res) => {
            //Error encountered
            if(err){
                console.log("error:", err);
                result(null, err);
                return;
            }

            // No theater found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //theater updated successfully
            console.log("updated theater: ", {theater_id: theater_id, ...theater});
            result(null, {theater_id: theater_id, ...theater});
        }
    );
}

// Delete an existing theater by ID
Theater.delete = (theater_id, result) => {
    sql.query("DELETE FROM theater WHERE theater_id = ?", theater_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No theater found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // theater deleted successfully
        console.log("deleted theater with theater_id: ", theater_id);
        result(null, res);
    });
}

module.exports = Theater;