import axios from 'axios';
import {isoDate} from '../helper/FormatDate';
export const SET_ACTIVE_MOVIES = "SET_ACTIVE_MOVIES"

const today = isoDate(); //get today's date in 'yyyy-mm-dd' format

export function loadActiveMovies(){
    // get movies actively showing today
    return async function(dispatch){
        return await axios.get('/api/movie/date/' + today)
        .then(function(res) {
            // save the showings to the store
            dispatch(setActiveMovies(res.data));
        })
        .catch(function(err){
            console.log("Failed to load schedules. ", err)
        });
    };
}


export function setActiveMovies(data){
    return{
        type: SET_ACTIVE_MOVIES,
        payload: {data}
    }
}