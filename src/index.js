import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from 'store/auth-store';
import { setUserToken } from 'store/actions';

const authToken = localStorage.getItem('authToken');

if (authToken) {
  let token = !authToken ? undefined :  authToken;
  store.dispatch(setUserToken(token));
}

injectTapEventPlugin();

ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById('root')
);
