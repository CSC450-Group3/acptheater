export const SELECT_MOVIE = "SELECT_MOVIE"
export const CLEAR_MOVIE_SELECTION = "CLEAR_MOVIE_SELECTION"



export function selectMovieToWatch(movie_id, title, cast, plot, duration, rated, poster_url, genre, release_date, selected_date){
    return{
        type: SELECT_MOVIE,
        payload: {movie_id, title, cast, plot, duration, rated, poster_url, genre, release_date, selected_date}
    }
}

export function clearMovieToWatch(){
    return{
        type: CLEAR_MOVIE_SELECTION,
        payload: {}
    }
}

