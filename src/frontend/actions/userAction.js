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
    return{
        type: UPDATE_ACCOUNT,
        payload: {user_id, first_name, last_name, middle_name, birthday, email, password, type}
    }
}