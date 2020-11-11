import axios from 'axios';
export const LOGIN = "LOGIN"
export const LOG_OFF = "LOG_OFF"
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT"

export function loginAction(user_id, first_name, last_name, middle_name, birthday, email, password, type){
    return{
        type: LOGIN,
        payload: {user_id, first_name, last_name, middle_name, birthday, email, password, type}
    }
}

export function logoffAction(userID){
    return{
        type: LOG_OFF,
        payload: {userID}
    }
}

export function updateAccountAction(user_id, first_name, last_name, middle_name, birthday, email, password, type){
    // update user account with current user data
    return async function(dispatch){
        return await axios.put('/api/user/' + user_id + '/update', {
            "first_name": first_name,
            "last_name": last_name,
            "middle_name": middle_name,
            "birthday": birthday,
            "email": email,
            "password": password,
            "type": type,
            "disabled": null
        })
        .then(function(res) {
            // save the user to the store
            const user = res.data;
            dispatch(setAccountAction(user.user_id, user.first_name, user.last_name, user.middle_name, user.birthday, user.email, user.password, user.type));
        })
        .catch(function(err){
            console.log("Failed to update user: ", err)
        });
    };
}


export function setAccountAction(user_id, first_name, last_name, middle_name, birthday, email, password, type){
    return{
        type: UPDATE_ACCOUNT,
        payload: {user_id, first_name, last_name, middle_name, birthday, email, password, type}
    }
}