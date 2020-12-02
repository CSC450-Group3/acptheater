import {SET_NEW_MESSAGES} from "../actions/newMessageActions.js";

const INITIAL_STATE=  {};

export default function newMessageReducer(state = INITIAL_STATE, action ={}){
    switch(action.type){
        case SET_NEW_MESSAGES:{
            //console.log(action.payload.data)
            const newMessages = action.payload.data;
            return newMessages;
        }

        default: {
            break;
        }
    }

    return state;
}