import {SET_TICKET, CLEAR_TICKET} from "../actions/selectTicketActions.js";

const INITIAL_STATE=  {
    showing_id: "",
    date: "",
    time:"",
    number_of_viewers:"",
    virtual_ticket:"",
    theater_ticket:""
};

export default function selectTicketReducer(state = INITIAL_STATE, action ={}){
    //console.log(action.type)
    switch(action.type){
        case SET_TICKET:{
            //console.log(action.payload.data)
            const ticket = {
                showing_id: action.payload.showing_id,
                date: action.payload.date,
                time: action.payload.time,
                number_of_viewers: action.payload.number_of_viewers,
                ticket_type: action.payload.ticket_type,
            }
            return ticket;
        }

        case CLEAR_TICKET:{            
            return INITIAL_STATE;
        }

        default: {
            break;
        }
    }

    return state;
}