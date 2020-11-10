import {SET_ACTIVE_MOVIES} from "../actions/showtimeAction.js";

const INITIAL_STATE=  {};

export default function showtimeReducer(state = INITIAL_STATE, action ={}){
    //console.log(action.type)
    switch(action.type){
        case SET_ACTIVE_MOVIES:{
            //console.log(action.payload.data)
            const allActiveShowings = action.payload.data;
            return allActiveShowings;
        }

        default: {
            break;
        }
    }

    return state;
}