import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminMovieSelectionReducer from './adminMovieSelectionReducer';
import scheduleMovieReducer from './scheduleMovieReducer';
import showtimeReducer from './showtimeReducer';
import customerMovieSelectionReducer from './customerMovieSelectionReducer';
import selectTicketReducer from './selectTicketReducer';
import seatReducer from './seatReducer'

export default combineReducers({
  user: userReducer,
  movieToSchedule: adminMovieSelectionReducer,
  showings: scheduleMovieReducer,
  scheduledMovies: showtimeReducer, 
  customerMovie: customerMovieSelectionReducer,
  selectedTicket: selectTicketReducer,
  selectedSeats: seatReducer,
});