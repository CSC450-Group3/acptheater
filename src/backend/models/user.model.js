var sql = require('../db.config')

//User object constructor
var User = function(user){
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.middle_name = user.middle_name;
    this.birthday = user.birthday;
    this.email = user.email;
    this.password = user.password;
    this.type = user.type;
    this.disabled = user.disabled
};

// Create new user record
User.create = (newUser, result) => {
    sql.query(`INSERT INTO user(first_name, last_name, middle_name, birthday, email, password, type) ` +
    `VALUES( '${newUser.first_name}', ` +
            `'${newUser.last_name}', ` +
            `IF(ISNULL(${newUser.middle_name}), null, '${newUser.middle_name}'), ` +
            `'${newUser.birthday}', ` +
            `'${newUser.email}', ` +
            `SHA1('${newUser.password}'), `+ //SHA1 converts the password to a hash value
            `'${newUser.type}'` +
    `)`, 
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //User created successfully
        console.log("Created user: ", {user_id: res.insertId, ...newUser});
        result(null, { user_id: res.insertId, ...newUser});
    });
};


// Find user By ID
User.findById = (user_id, result) => {
    sql.query(`Select * FROM user WHERE user_id = ${user_id}`, (err, res) => {
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

// Validate username/email and password
User.validateCredentials = (email, password, result) => {
    sql.query(`Select * from user WHERE email = '${email}' AND password = SHA1('${password}')`, 
        
        (err, res) => {
            //Error encountered
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }

            //User found with matching credentials
            if(res.length){
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }
      
            //User not found
            result({kind: "not_found"}, null);
    });
};


// Update an existing User by ID
User.updateById = (user_id, user, result) => {
    sql.query(
        `Update user 
            SET email = '${user.email}', 
                password = SHA1('${user.password}') , 
                type = '${user.type}', 
                disabled = ${user.disabled}
        WHERE user_id = ${user_id}`,
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

// Delete an existing user by ID
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