import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './routes/home';
import './app.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Route exact path="/"><Home /> </Route>
      </div>
    </Router>
  );
}

export default App;
