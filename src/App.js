import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './frontend/pages/Home';
import NavbarUser from './frontend/components/app/NavbarUser';
import NavbarAdmin from './frontend/components/app/NavbarAdmin';
import NavbarHome from './frontend/components/app/NavbarHome';
import Footer from './frontend/components/app/Footer';
import './App.css';

function App() {
  return (
    <Router>
        <NavbarAdmin />
      <div className="App">
          <Route exact path="/"><Home /> </Route>
      </div>
        <Footer/>
    </Router>
  );
}

export default App;
