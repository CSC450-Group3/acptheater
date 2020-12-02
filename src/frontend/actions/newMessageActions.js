import axios from 'axios';
export const SET_NEW_MESSAGES = "SET_NEW_MESSAGES";

export function loadNewMessages(user){
   
    // get movies actively showing today
    return async function(dispatch){
        return await axios.get('/api/message/new/user/' + user.user_id + '/type/' + user.type)
        .then(function(res) {
            // save the showings to the store
            dispatch(setNewMessages(res.data));
        })
        .catch(function(err){
            console.log("Failed to load schedules. ", err)
        });
    };
}

export function setNewMessages(data){
    return{
        type: SET_NEW_MESSAGES,
        payload: {data}
    }
}