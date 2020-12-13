import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './frontend/pages/Home';
import Movies from './frontend/pages/Movies';
import Showtimes from './frontend/pages/Showtimes';
import PurchaseTickets from './frontend/pages/PurchaseTickets';
import SeatingChart from './frontend/pages/SeatingChart';
import Payment from './frontend/pages/Payment';
import Confirmation from "./frontend/pages/Confirmation";
import ScheduleForm from './frontend/pages/ScheduleForm';
import SignUp from './frontend/pages/SignUp';
import Login from './frontend/pages/Login';
import UserDashboard from './frontend/pages/UserDashboard';
import StreamVirtual from './frontend/pages/StreamVirtual'
import Navbar from './frontend/components/app/Navbar';
import Footer from './frontend/components/app/Footer';
import MessageThread from './frontend/pages/MessageThread';
import Unauthorized from './frontend/pages/Unathorized';
import ProtectedRoute from './frontend/components/authentication/ProtectedRoute'
import { loginAction, logoffAction, updateAccountAction } from "./frontend/actions/userAction.js";
import { selectMovieToSchedule, clearMovieToSchedule } from "./frontend/actions/adminMovieSelectionAction";
import { addSchedule, removeSchedule, clearScheudles } from "./frontend/actions/scheduleMovieAction";
import { loadActiveMovies } from './frontend/actions/showtimeAction';
import { selectMovieToWatch, clearMovieToWatch } from './frontend/actions/customerMovieSelectionAction';
import { clearSelectedTicket, setSelectedTicketInfo } from './frontend/actions/selectTicketActions';
import { addSeat, removeSeat, clearSeats } from './frontend/actions/seatAction';
import { loadNewMessages } from './frontend/actions/newMessageActions'
import './App.css';


class App extends Component {

	componentDidMount() {
		//loads the movies actively playing today
		this.props.loadActiveMovies();

		//load new messages 
		if (this.props.user.user_id !== "") {
			this.props.loadNewMessages(this.props.user)
		}
	}

	render() {
		const {
			// data
			customerMovie,
			movieToSchedule,
			newMessages,
			selectedTicket,
			scheduledMovies,
			showings,
			user,
			selectedSeats,
			//actions
			addSchedule,
			addSeat,
			clearMovieToSchedule,
			clearMovieToWatch,
			clearScheudles,
			clearSelectedTicket,
			clearSeats,
			loginAction,
			logoffAction,
			loadActiveMovies,
			loadNewMessages,
			removeSchedule,
			removeSeat,
			selectMovieToSchedule,
			selectMovieToWatch,
			setSelectedTicketInfo,
			updateAccountAction,
			//browser history
			history
		} = this.props;

		/**
		 * clears all selected movie details (tickets, seats, movie) from the customer
		 */
		function clearMovieTicketSelections() {
			clearSelectedTicket();
			clearMovieToWatch();
			clearSeats();
		}

		return (
			<Router>
				<div className="App">
					<Navbar
						user={user}
						logoffAction={logoffAction}
						history={history}
						newMessages={newMessages}
					/>
					<div className="content" style={{ minHeight: "90vh" }}>

						<Switch>
							<Route exact path="/">
								<Home
									scheduledMovies={scheduledMovies}
									selectMovieToWatch={selectMovieToWatch}
									customerMovie={customerMovie}
									clearMovieToWatch={clearMovieToWatch}
									user={user}
									history={history}
								/>
							</Route>

							<ProtectedRoute
								exact path="/Movies"
								component={Movies}
								accessType="ADMIN"
								user={user}
								selectMovieToSchedule={selectMovieToSchedule}
								movieToSchedule={movieToSchedule}
								clearMovieToSchedule={clearMovieToSchedule}
								history={history}
							/>

							<ProtectedRoute
								exact path="/ScheduleForm"
								component={ScheduleForm}
								accessType="ADMIN"
								user={user}
								movieToSchedule={movieToSchedule}
								clearMovieToSchedule={clearMovieToSchedule}
								clearScheudles={clearScheudles}
								showings={showings}
								addSchedule={addSchedule}
								removeSchedule={removeSchedule}
								loadActiveMovies={loadActiveMovies}
								history={history}
							/>

							<Route exact path="/Showtimes">
								<Showtimes
									scheduledMovies={scheduledMovies}
									selectMovieToWatch={selectMovieToWatch}
									customerMovie={customerMovie}
									clearMovieToWatch={clearMovieToWatch}
									user={user}
									history={history}
								/>
							</Route>

							<ProtectedRoute
								exact path="/PurchaseTickets"
								component={PurchaseTickets}
								accessType="GENERAL"
								user={user}
								selectedTicket={selectedTicket}
								customerMovie={customerMovie}
								setSelectedTicketInfo={setSelectedTicketInfo}
								clearSeats={clearSeats}
								clearSelectedTicket={clearSelectedTicket}
								clearMovieToWatch={clearMovieToWatch}
								clearMovieTicketSelections={clearMovieTicketSelections}
								history={history}
							/>

							<ProtectedRoute
								exact path="/SeatingChart"
								component={SeatingChart}
								accessType="GENERAL"
								user={user}
								selectedTicket={selectedTicket}
								selectedSeats={selectedSeats}
								addSeat={addSeat}
								removeSeat={removeSeat}
								clearSeats={clearSeats}
								clearMovieToWatch={clearMovieToWatch}
								clearSelectedTicket={clearSelectedTicket}
								clearMovieTicketSelections={clearMovieTicketSelections}
								history={history}
							/>

							<ProtectedRoute
								exact path="/Payment"
								component={Payment}
								accessType="GENERAL"
								user={user}
								history={history}
								customerMovie={customerMovie}
								selectedSeats={selectedSeats}
								selectedTicket={selectedTicket}
								clearMovieToWatch={clearMovieToWatch}
								clearSelectedTicket={clearSelectedTicket}
								clearMovieTicketSelections={clearMovieTicketSelections}
								clearSeats={clearSeats}
							/>
							<ProtectedRoute
								exact path="/Confirmation"
								component={Confirmation}
								accessType="GENERAL"
								user={user}
								customerMovie={customerMovie}
								selectedSeats={selectedSeats}
								selectedTicket={selectedTicket}
								clearMovieTicketSelections={clearMovieTicketSelections}
							/>

							<ProtectedRoute
								exact path="/UserDashboard/:tab_name"
								component={UserDashboard}
								accessType="GENERAL"
								user={user}
								history={history}
								updateAccountAction={updateAccountAction}
							/>

							<ProtectedRoute
								exact path="/Thread/:thread_id/User/:user_id"
								component={MessageThread}
								accessType="GENERAL"
								user={user}
								loadNewMessages={loadNewMessages}
							/>

							<Route exact path="/SignUp">
								<SignUp history={history} /> 
							</Route>

							<Route exact path="/Login">
								<Login loginAction={loginAction} history={history} /> 
							</Route>
							
							<ProtectedRoute
								exact path="/StreamVirtual"
								component={StreamVirtual}
								accessType="GENERAL"
								user={user}
								history={history}
							/>
							<Route exact path='/Unauthorized'> <Unauthorized /> </Route>

							{/*No match */}
							<Route render={() => <Redirect to="/" />} />
						</Switch>
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}


const mapStateToProps = ({ user, movieToSchedule, showings, scheduledMovies, customerMovie, selectedTicket, selectedSeats, newMessages }) => {
	return {
		user,
		movieToSchedule,
		showings,
		scheduledMovies,
		customerMovie,
		selectedTicket,
		selectedSeats,
		newMessages
	}
}

//Reference: https://www.youtube.com/watch?v=JLBPJzl92os
const mapActionsToProps = (dispatch) => {
	//bind the actions
	return bindActionCreators({
		loadActiveMovies,
		loginAction,
		logoffAction,
		updateAccountAction,
		selectMovieToSchedule,
		selectMovieToWatch,
		addSchedule,
		removeSchedule,
		clearMovieToSchedule,
		clearMovieToWatch,
		clearScheudles,
		clearSelectedTicket,
		setSelectedTicketInfo,
		addSeat,
		removeSeat,
		clearSeats,
		loadNewMessages,
	}, dispatch)
}

export default connect(mapStateToProps, mapActionsToProps)(App);