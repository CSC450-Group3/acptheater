export const SET_TICKET = "SET_TICKET"
export const CLEAR_TICKET = "CLEAR_TICKET"

export function setSelectedTicketInfo(showing_id, date, time, number_of_viewers, ticket_type, price, screen_name){
    return{
        type: SET_TICKET,
        payload: {showing_id, date, time, number_of_viewers, ticket_type, price, screen_name}
    }
}

export function clearSelectedTicket(){
    return{
        type: CLEAR_TICKET,
        payload:{}
    }
}