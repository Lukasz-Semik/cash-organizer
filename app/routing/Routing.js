import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import LandingPage from '../src/LandingPage';
import App from '../src/App';
import Navigation from '../src/Navigation';
import SignUpPage from '../src/SignUpPage';
import LoginPage from '../src/LoginPage';

const Routing = () => (
  <Router history={history}>
    <div>
      <Navigation />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/app' component={App} />
      </Switch>
    </div>
  </Router>
);

export default Routing;
