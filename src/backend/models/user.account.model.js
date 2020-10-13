var sql = require('../db.config')

//User Account object constructor
var UserAccount = function(userAccount){
    this.user_id = userAccount.user_id;
    this.email = userAccount.email;
    this.password = userAccount.password;
    this.type = userAccount.type;
    this.disabled = userAccount.disabled
};

// Create new user account record
UserAccount.create = (newUserAccount, result) => {
    sql.query("INSERT INTO useraccount(user_id, email, password, type) " +
    "VALUES(" + newUserAccount.user_id +
        ", '" + newUserAccount.email + "'" +
        ", SHA1( '" + newUserAccount.password +"')"+ //SHA1 converts the password to a hash value
        ", '" + newUserAccount.type + "'" +
    ")", 
    (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //User account created successfully
        console.log("Created user account: ", {user_account_id: res.insertId, ...newUserAccount});
        result(null, { id: res.insertId, ...newUserAccount });
    });
};


// Find user account By ID
UserAccount.findById = (user_account_id, result) => {
    sql.query(`Select * FROM useraccount WHERE user_account_id = ${user_account_id}`, (err, res) => {
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // User account is found 
        if(res.length){
            console.log("found user account: ", res[0]);
            result(null, res[0]);
            return;
        }

        //User account not found
        result({kind: "not_found"}, null);
    });
};

// Validate username/email and password
UserAccount.validateCredentials = (email, password, result) => {
    sql.query(`Select * from useraccount WHERE email = '${email}' AND password = SHA1('${password}')`, 
        
        (err, res) => {
            //Error encountered
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }

            //User account found with matching credentials
            if(res.length){
                console.log("found user account: ", res[0]);
                result(null, res[0]);
                return;
            }
            console.log(`Select * from useraccount WHERE email = '${email}' AND password = SHA1('${password}')`);
            //User account not found
            result({kind: "not_found"}, null);
    });
};


// Update an existing User by ID
UserAccount.updateById = (user_account_id, userAccount, result) => {
    sql.query(
        `Update useraccount 
            SET email = '${userAccount.email}', 
                password = SHA1('${userAccount.password}') , 
                type = '${userAccount.type}', 
                disabled = ${userAccount.disabled}
        WHERE user_account_id = ${user_account_id}`,
        (err, res) => {
            //Error encountered
            if(err){
                console.log("error:", err);
                result(null, err);
                return;
            }

            // No user account found with given ID
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return; 
            }

            //User account updated successfully
            console.log("updated user account: ", {user_account_id: user_account_id, ...userAccount});
            result(null, {user_account_id: user_account_id, ...userAccount});
        }
    );
}

// Delete an existing user account by ID
UserAccount.delete = (user_account_id, result) => {
    sql.query("DELETE FROM useraccount WHERE user_account_id = ?", user_account_id, (err, res) =>{
        //Error encountered
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // No user account found with given ID
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        // User account deleted successfully
        console.log("deleted user account with user_account_id: ", user_account_id);
        result(null, res);
    });
}

module.exports = UserAccount;