import {CLEAR_SCHEDULES, ADD_SCHEDULE, REMOVE_SCHEDULE} from "../actions/scheduleMovieAction.js";
import {cstDateTime} from "../helper/FormatDate"

const INITIAL_STATE=  {};

export default function scheduleMovieReducer(state = INITIAL_STATE, action ={}){
    //console.log(action.type)
    switch(action.type){
        case ADD_SCHEDULE:{
            //console.log(action.payload)
            const showingDetails = action.payload;

            //update the state with the passed in movie data
            const newShowing = {
                "key": showingDetails.key,
                "screen_id": showingDetails.screen_id,
                "screen_name": showingDetails.screen_name,
                "start_date_time": cstDateTime(showingDetails.start_date_time),
                "price": showingDetails.price
            };
            
            //console.log(newShowing)
            //add new showing to the showing list with the unique key
            state[showingDetails.key] = newShowing;
            return state;
        }

        case CLEAR_SCHEDULES:{
            //set state back to default
            return {};
        }

        case REMOVE_SCHEDULE:{
            //console.log(action)
            const showingKey = action.payload.key;
            const currentShowings = state;

            //remove the showing with the given key
            const updatedShowings = Object.keys(currentShowings).reduce((object, key) => {
                if (key !== showingKey) {
                  object[key] = currentShowings[key]
                }
                return object
            }, {})

            return updatedShowings;
        }

        default: {
            break;
        }
    }

    return state;
}