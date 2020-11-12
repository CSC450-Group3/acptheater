import {CLEAR_MOVIE_SELECTION, SELECT_MOVIE} from "../actions/adminMovieSelectionAction.js";

const INITIAL_STATE={
    movie_id: "",
    title:"",
    cast: "", 
    plot: "", 
    duration: "", 
    rated: "", 
    poster_url: "", 
    genre: "",
    release_date:""
};

export default function adminMovieSelectionReducer(state = INITIAL_STATE, action ={}){
    //console.log(action.type)
    switch(action.type){
        case SELECT_MOVIE:{
            //console.log(action.payload)
            const movieDetails = action.payload;

            //update the state with the passed in movie data
            const movie = {
                "id": movieDetails.movie_id,
                "title": movieDetails.title,
                "cast":movieDetails.cast,
                "plot":movieDetails.plot,
                "duration": movieDetails.duration,
                "rated":movieDetails.rated,
                "poster_url": movieDetails.poster_url,
                "genre": movieDetails.genre,
                "release_date": movieDetails.release_date
            };

            return movie;
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