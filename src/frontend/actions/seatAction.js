export const CLEAR_SEATS = "CLEAR_SEATS"
export const ADD_SEAT = "ADD_SEAT"
export const REMOVE_SEAT = "REMOVE_SEAT"


export function clearSeats(){
    return{
        type: CLEAR_SEATS,
        payload: {}
    }
}

export function addSeat(seat_id, screen_id, blocked, booked, row_name, seat_number, wheelchair){
    return{
        type: ADD_SEAT,
        payload: {seat_id, screen_id, blocked, booked, row_name, seat_number, wheelchair}
    }
}

export function removeSeat(seat_id){
    return{
        type: REMOVE_SEAT,
        payload: {seat_id}
    }
}