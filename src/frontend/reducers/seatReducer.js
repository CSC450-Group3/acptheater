import { CLEAR_SEATS, ADD_SEAT, REMOVE_SEAT } from "../actions/seatAction.js";

const INITIAL_STATE = {};

export default function seatReducer(state = INITIAL_STATE, action = {}) {
    //console.log(action.type)
    switch (action.type) {
        case ADD_SEAT: {
            //console.log(action.payload)
            const newSeat = action.payload;

            //update the state with the passed in movie data
            const seat = {
                seat_id: newSeat.seat_id,
                screen_id: newSeat.screen_id,
                blocked: newSeat.blocked,
                booked: newSeat.booked,
                row_name: newSeat.row_name,
                seat_number: newSeat.seat_number,
                wheelchair: newSeat.wheelchair,
            };

            //add new showing to the showing list with the unique key
            state[newSeat.seat_id] = seat;

            return state;
        }

        case CLEAR_SEATS: {
            //set state back to default
            return {};
        }

        case REMOVE_SEAT: {
            //console.log(action)
            const seat_id = action.payload.seat_id;
            const currentSeats = state;

            //remove the showing with the given key
            const updatedSeats = Object.keys(currentSeats).reduce((object, key) => {
                if (key !== seat_id) {
                    object[key] = currentSeats[key]
                }
                return object
            }, {})
            return updatedSeats;
        }

        default: {
            break;
        }
    }

    return state;
}