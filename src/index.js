import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from "./frontend/reducers";
import { loadState, saveState } from './localStorage';

//load state from local storage
const persistedState = loadState();

//create our Redux Store
const store = createStore(
  rootReducer, 
  persistedState
);

//update the local storage state when there are changes
store.subscribe(()=>{
  saveState({
    user: store.getState().user
  });
})



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
