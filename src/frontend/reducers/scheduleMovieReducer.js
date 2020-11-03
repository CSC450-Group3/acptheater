import {CLEAR_SCHEDULES, ADD_SCHEDULE, REMOVE_SCHEDULE} from "../actions/scheduleMovieAction.js";

const INITIAL_STATE=  {};

export default function scheduleMovieReducer(state = INITIAL_STATE, action ={}){
    console.log(action.type)
    switch(action.type){
        case ADD_SCHEDULE:{
            //console.log(action.payload)
            const showingDetails = action.payload;

            //update the state with the passed in movie data
            const newShowing = {
                "key": showingDetails.key,
                "screen_id": showingDetails.screen_id,
                "screen_name": showingDetails.screen_name,
                "start_date_time":showingDetails.start_date_time,
                "price": showingDetails.price
            };
            
            //add new showing to the showing list with the unique key
            state[showingDetails.key] = newShowing;

            console.log("current ",state)
            return state;
        }

        case CLEAR_SCHEDULES:{
            //set state back to default
            return {};
        }

        case REMOVE_SCHEDULE:{
            //console.log(action)
            const showingKey = action.payload;
            const currentShowings = state;

            //remove the showing with the given key
            delete currentShowings[showingKey];
            return currentShowings;
        }

        default: {
            break;
        }
    }

    return state;
}