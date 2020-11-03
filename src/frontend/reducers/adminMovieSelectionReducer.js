import {CLEAR_MOVIE_SELECTION, SELECT_MOVIE} from "../actions/adminMovieSelectionAction.js";

const INITIAL_STATE={
    id: "",
    title:"",
    cast: "", 
    plot: "", 
    duration: "", 
    rated: "", 
    poster_URL: "", 
    genre: "",
    release_date:""
};

export default function adminMovieSelectionReducer(state = INITIAL_STATE, action ={}){
    console.log(action.type)
    switch(action.type){
        case SELECT_MOVIE:{
            //console.log(action.payload)
            const movieDetails = action.payload;

            //update the state with the passed in movie data
            const movieToSchedule = {
                "id": "",
                "title": movieDetails.title,
                "cast":movieDetails.cast,
                "plot":movieDetails.plot,
                "duration": movieDetails.duration,
                "rated":movieDetails.rated,
                "poster_URL": movieDetails.poster_URL,
                "genre": movieDetails.genre,
                "release_date": movieDetails.release_date,
                "director": null //leaving blank for now
            };

            return movieToSchedule;
        }

        case CLEAR_MOVIE_SELECTION:{
            //set state back to default
            return INITIAL_STATE;
        }

        default: {
            break;
        }
    }

    return state;
}