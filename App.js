import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import NavbarUser from './pages/NavbarUser';
import NavbarAdmin from './pages/NavbarAdmin';
import NavbarHome from './pages/NavbarHome';
import Footer from './pages/Footer';
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
