import {LOGIN} from "../actions/userAction.js";
import {LOG_OFF} from "../actions/userAction.js";
import {UPDATE_ACCOUNT} from "../actions/userAction.js";

const INITIAL_STATE={
    "user_id": "",
    "first_name": "",
    "last_name":"",
    "middle_name":"",
    "birthday": "",
    "email":"",
    "password": "",
    "type": "",
    "disabled":""
};

export default function userReducer(state = INITIAL_STATE, action ={}){
switch(action.type){
    case LOGIN:{
        console.log(action)
        const userDetails = action.payload;
        //update the state with the passed user data
        const user = {
            "user_id": userDetails.user_id,
            "first_name": userDetails.first_name,
            "last_name":userDetails.last_name,
            "middle_name":userDetails.middle_name,
            "birthday": userDetails.birthday,
            "email":userDetails.email,
            "password": userDetails.password,
            "type": userDetails.type,
            "disabled": null //leaving the disabled value null until we decide if a user will have this ability
        };
        return user;

    }

    case LOG_OFF:{
        //console.log(action)
        const user = action.payload;

        //clear the state values
        if(state.userID === user.userID){
            return INITIAL_STATE;
        }
        break;
    }

    case UPDATE_ACCOUNT:{
        console.log(action)
        const user = action.payload;
        if(state.userID === user.userID){
            //update profile with the new user information
            const user = {
                "user_id": user.user_id,
                "first_name": user.first_name,
                "last_name":user.last_name,
                "middle_name":user.middle_name,
                "birthday": user.birthday,
                "email":user.email,
                "password": user.password,
                "type": user.type,
                "disabled": null //leaving the disabled value null until we decide if a user will have this ability
            };

            return user;
        }
        break;
    }
    default:{

        break;
    }
}
return state;
}