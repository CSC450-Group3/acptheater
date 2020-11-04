export const SELECT_MOVIE = "SELECT_MOVIE"
export const CLEAR_MOVIE_SELECTION = "CLEAR_MOVIE_SELECTION"



export function selectMovieToSchedule(title, cast, plot, duration, rated, poster_URL, genre, release_date){
    return{
        type: SELECT_MOVIE,
        payload: {title, cast, plot, duration, rated, poster_URL, genre, release_date}
    }
}

export function clearMovieToSchedule(){
    return{
        type: CLEAR_MOVIE_SELECTION,
        payload: {}
    }
}

