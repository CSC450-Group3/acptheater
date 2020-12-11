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
            result(err, null);
            return;
        }

        //User created successfully
        result(null, { user_id: res.insertId, ...newUser});
    });
};


// Find user By ID
User.findById = (user_id, result) => {
    sql.query(`SELECT user_id, first_name, last_name, middle_name, DATE_FORMAT(birthday, '%c/%e/%Y') AS birthday, email, password, type, disabled 
                FROM user 
                WHERE user_id = ${user_id}`, 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        // User is found 
        if(res.length){
            result(null, res[0]);
            return;
        }

        //User not found
        result({kind: "not_found"}, null);
    });
};

// Validate username/email and password
User.validateCredentials = (credentials, result) => {
    sql.query("SELECT user_id, first_name, last_name, middle_name, DATE_FORMAT(birthday, '%c/%e/%Y') AS birthday, email, password, type, disabled "+
                "FROM user " +
                "WHERE email = ? AND password = SHA1(?)", 
    [credentials.email, credentials.password], 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //return results
        result(null, res);
        return;
    });
};


// Get user by email
User.getByEmail = (email, result) => {
    sql.query("SELECT user_id, first_name, last_name, middle_name, DATE_FORMAT(birthday, '%c/%e/%Y') AS birthday, email, password, type, disabled "+
                "FROM user " +
                "WHERE email = ?", 
    [email], 
    (err, res) => {
        //Error encountered
        if(err){
            result(err, null);
            return;
        }

        //return results
        result(null, res);
        return;
    });
};



// Update an existing User by ID
User.updateById = (user_id, user, result) => {
    //update all user fields
    if(user.password !== null){
        sql.query(
            `UPDATE user 
                SET 
                    first_name = '${user.first_name}',
                    last_name = '${user.last_name}',
                    middle_name = CASE WHEN  ISNULL(${user.middle_name}) THEN null ELSE '${user.middle_name}' END,
                    birthday='${user.birthday}',
                    email = '${user.email}', 
                    password = SHA1('${user.password}') , 
                    type = '${user.type}', 
                    disabled = ${user.disabled}
            WHERE user_id = ${user_id}`,
            (err, res) => {
                //Error encountered
                if(err){
                    console.log(err)
                    result(null, err);
                    return;
                }

                // No user found with given ID
                if(res.affectedRows == 0){
                    result({kind: "not_found"}, null);
                    return; 
                }

                //User updated successfully
                result(null, {user_id: user_id, ...user});
            }
            
        );
    }
    else{
        //do not change the password if a new password was not changed
        sql.query(
            `UPDATE user 
                SET 
                    first_name = '${user.first_name}',
                    last_name = '${user.last_name}',
                    middle_name = CASE WHEN  ISNULL(${user.middle_name}) THEN null ELSE '${user.middle_name}' END,
                    birthday='${user.birthday}',
                    email = '${user.email}', 
                    type = '${user.type}', 
                    disabled = ${user.disabled}
            WHERE user_id = ${user_id}`,
            (err, res) => {
                //Error encountered
                if(err){
                    result(null, err);
                    return;
                }

                // No user found with given ID
                if(res.affectedRows == 0){
                    result({kind: "not_found"}, null);
                    return; 
                }

                //User updated successfully
                result(null, {user_id: user_id, ...user});
            }
            
        );

    }
}

// Delete an existing user by ID
User.delete = (user_id, result) => {
    sql.query("DELETE FROM user WHERE user_id = ?", user_id, (err, res) =>{
        //Error encountered
        if(err){
            result(null, err);
            return;
        }

        // No user found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // User deleted successfully
        result(null, res);
    });
}

module.exports = User;