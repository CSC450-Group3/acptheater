export const CLEAR_SCHEDULES = "CLEAR_SCHEDULES"
export const ADD_SCHEDULE = "ADD_SCHEDULE"
export const REMOVE_SCHEDULE = "REMOVE_SCHEDULE"


export function clearScheudles(){
    return{
        type: CLEAR_SCHEDULES,
        payload: {}
    }
}

export function addSchedule(key, screen_id, screen_name, start_date_time, price){
    return{
        type: ADD_SCHEDULE,
        payload: {key, screen_id, screen_name, start_date_time, price}
    }
}

export function removeSchedule(key){
    return{
        type: REMOVE_SCHEDULE,
        payload: {key}
    }
}