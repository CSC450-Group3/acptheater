import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './frontend/pages/Home';
import Movies from './frontend/pages/Movies';
import ScheduleForm from './frontend/pages/ScheduleForm';
import SignUp from './frontend/pages/SignUp';
import Login from './frontend/pages/Login';
import NavbarAdmin from './frontend/components/app/NavbarAdmin';
import Footer from './frontend/components/app/Footer';
import './App.css';

function App() {
  return (
    <Router>
        <NavbarHome />
        {/*<NavbarUser />
        <NavbarAdmin />*/}
      <div className="App">
          <Route exact path="/"><Home /> </Route>
          <Route exact path="/Home"><Home /> </Route>
          <Route exact path="/Movies"><Movies /> </Route>
          <Route exact path="/ScheduleForm"><ScheduleForm /> </Route>
          <Route exact path="/SignUp"><SignUp /> </Route>
          <Route exact path="/Login"><Login /> </Route>
      </div>
        <Footer/>
    </Router>
  );
}

export default App;
