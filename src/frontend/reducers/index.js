import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminMovieSelectionReducer from './adminMovieSelectionReducer';
import scheduleMovieReducer from './scheduleMovieReducer';
import showtimeReducer from './showtimeReducer';
import customerMovieSelectionReducer from './customerMovieSelectionReducer';

export default combineReducers({
  user: userReducer,
  movieToSchedule: adminMovieSelectionReducer,
  showings: scheduleMovieReducer,
  scheduledMovies: showtimeReducer, 
  customerMovie: customerMovieSelectionReducer,
});