import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './frontend/pages/Home';
import Movies from './frontend/pages/Movies';
import Showtimes from './frontend/pages/Showtimes';
import PurchaseTickets from './frontend/pages/PurchaseTickets';
import SeatingChart from './frontend/pages/SeatingChart';
import ScheduleForm from './frontend/pages/ScheduleForm';
import SignUp from './frontend/pages/SignUp';
import Login from './frontend/pages/Login';
import UserDashboard from './frontend/pages/UserDashboard';
import Navbar from './frontend/components/app/Navbar';
import Footer from './frontend/components/app/Footer';
import { loginAction, logoffAction, updateAccountAction } from "./frontend/actions/userAction.js";
import { selectMovieToSchedule, clearMovieToSchedule } from "./frontend/actions/adminMovieSelectionAction";
import { addSchedule, removeSchedule, clearScheudles } from "./frontend/actions/scheduleMovieAction";
import { loadActiveMovies } from './frontend/actions/showtimeAction';
import { selectMovieToWatch, clearMovieToWatch } from './frontend/actions/customerMovieSelectionAction';

import './App.css';

class App extends Component {

  componentDidMount() {
    //loads the movies actively playing today
    this.props.loadActiveMovies();
  }

  render() {
    const {
      // data
      customerMovie,
      movieToSchedule,
      scheduledMovies,
      showings,
      user,
      //actions
      addSchedule,
      clearMovieToSchedule,
      clearMovieToWatch,
      clearScheudles,
      loginAction,
      logoffAction,
      removeSchedule,
      selectMovieToSchedule,
      selectMovieToWatch,
      updateAccountAction,
      //browser history
      history
    } = this.props;

    
    return (
      <Router>
        <div className="App">
          <Navbar user={user} logoffAction={logoffAction} />
          <div className="content" style={{ minHeight: "90vh" }}>
            <Route exact path="/">
              <Home 
                scheduledMovies={scheduledMovies} 
                selectMovieToWatch={selectMovieToWatch} 
                customerMovie={customerMovie} 
                clearMovieToWatch={clearMovieToWatch}
                history={history}
              /> 
            </Route>
            <Route exact path="/Movies"><Movies selectMovieToSchedule={selectMovieToSchedule} /> </Route>
            <Route exact path="/ScheduleForm">
              <ScheduleForm
                movieToSchedule={movieToSchedule}
                clearMovieToSchedule={clearMovieToSchedule}
                clearScheudles={clearScheudles}
                showings={showings}
                addSchedule={addSchedule}
                removeSchedule={removeSchedule}
                history={history}
              />
            </Route>
            <Route exact path="/Showtimes">
              <Showtimes 
                scheduledMovies={scheduledMovies} 
                selectMovieToWatch={selectMovieToWatch} 
                customerMovie={customerMovie} 
                clearMovieToWatch={clearMovieToWatch}
                history={history}
              /> 
            </Route>
            <Route exact path="/PurchaseTickets"><PurchaseTickets /> </Route>
            <Route exact path="/SeatingChart"><SeatingChart /> </Route>
            <Route exact path="/UserDashboard"><UserDashboard /> </Route>
            <Route exact path="/SignUp"><SignUp history={history} /> </Route>
            <Route exact path="/Login"><Login loginAction={loginAction} history={history} /> </Route>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}


const mapStateToProps = ({ user, movieToSchedule, showings, scheduledMovies, customerMovie }) => {
  return {
    user,
    movieToSchedule,
    showings,
    scheduledMovies,
    customerMovie
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
    clearScheudles
  }, dispatch)
}

export default connect(mapStateToProps, mapActionsToProps)(App);
