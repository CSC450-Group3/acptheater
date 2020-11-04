import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminMovieSelectionReducer from './adminMovieSelectionReducer';
import scheduleMovieReducer from './scheduleMovieReducer';

export default combineReducers({
  user: userReducer,
  movieToSchedule: adminMovieSelectionReducer,
  showings: scheduleMovieReducer
});