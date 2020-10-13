var sql = require('../db.config')

//User object constructor
var User = function(user){
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.middle_name = user.middle_name;
    this.birthday = user.birthday
};

// Create new User record
User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //User created successfully
        console.log("Created user: ", {user_id: res.insertId, ...newUser});
        result(null, { id: res.insertId, ...newUser });
    });
};


// Find User By ID
User.findById = (user_id, result) => {
    sql.query(`Select * FROM user where user_id = ${user_id}`, (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // User is found 
        if(res.length){
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        //User not found
        result({kind: "not_found"}, null);
    });
};

// Get all User records
User.getAll = result => {
    sql.query("Select * from user", (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //Users found
        console.log("users: ", res);
        result(null, res);
    });
};


// Update an existing User by ID
User.updateById = (user_id, user, result) => {
    sql.query(
        "Update user SET first_name = ?, last_name = ? , middle_name = ?, birthday = ? WHERE user_id = ?",
        [user.first_name, user.last_name, user.middle_name, user.birthday, user_id],
        (err, res) => {
            //Error encountered
            if(err){
                console.log("error:", err);
                result(null, err);
                return;
            }

            // No user found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //User updated successfully
            console.log("updated user: ", {user_id: user_id, ...user});
            result(null, {user_id: user_id, ...user});
        }
    );
}

// Delete an existing User by ID
User.delete = (user_id, result) => {
    sql.query("DELETE FROM user WHERE user_id = ?", user_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No user found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // User deleted successfully
        console.log("deleted user with user_id: ", user_id);
        result(null, res);
    });
}

module.exports = User;