import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './frontend/pages/Home';
import Movies from './frontend/pages/Movies';
import ScheduleForm from './frontend/pages/ScheduleForm';
import SignUp from './frontend/pages/SignUp';
import Login from './frontend/pages/Login';
import Navbar from './frontend/components/app/Navbar';
import Footer from './frontend/components/app/Footer';
import {loginAction, logoffAction, updateAccountAction} from "./frontend/actions/userAction.js";
import {selectMovieToSchedule, clearMovieToSchedule} from "./frontend/actions/adminMovieSelectionAction";
import {addSchedule, removeSchedule, clearScheudles} from "./frontend/actions/scheduleMovieAction"

import './App.css';

class App extends Component{
  
  render(){

    const {
      user,
      movieToSchedule,
      showings,
      loginAction,
      logoffAction, 
      updateAccountAction, 
      selectMovieToSchedule, 
      addSchedule,
      removeSchedule,
      clearMovieToSchedule,
      clearScheudles,
      history
    } = this.props;

    return (
      <Router>
        <Navbar user={user} logoffAction={logoffAction} />
        <div className="App">
          <Route exact path="/"><Home /> </Route>
          <Route exact path="/Home"><Home /> </Route>
          <Route exact path="/Movies"><Movies selectMovieToSchedule={selectMovieToSchedule}/> </Route>
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
          <Route exact path="/SignUp"><SignUp history={history} /> </Route>
          <Route exact path="/Login"><Login  loginAction={loginAction} history={history}/> </Route>
        </div>
          <Footer/>
      </Router>
    );
  }
}


const mapStateToProps =({user, movieToSchedule, showings}) =>{
  return{
      user,
      movieToSchedule,
      showings
  }
}

//Reference: https://www.youtube.com/watch?v=JLBPJzl92os
const mapActionsToProps = (dispatch) =>{
  //bind the user profile actions
  return bindActionCreators({
      loginAction,
      logoffAction,
      updateAccountAction,
      selectMovieToSchedule,
      addSchedule,
      removeSchedule,
      clearMovieToSchedule,
      clearScheudles
  }, dispatch)
}

export default connect(mapStateToProps,mapActionsToProps)(App);
