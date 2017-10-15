import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import LandingPage from '../src/LandingPage';
import App from '../src/App';
import Navigation from '../src/Navigation';
import SignUpPage from '../src/logincomponents/SignUpPage';
import LoginPage from '../src/logincomponents/LoginPage';
import OneShotCreator from '../src/components/OneShotCreator';
import OneShotEditor from '../src/components/OneShotEditor';
import StdExpCreator from '../src/components/StdExpCreator';
import StdExpEditor from '../src/components/StdExpEditor';

const Routing = () => (
  <Router history={history}>
    <div>
      <Navigation />
      <Switch>
        <Route exact={true} path='/' component={LandingPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/app' component={App} />
        <Route path='/oneshotcreator' component={OneShotCreator} />
        <Route path='/oneshoteditor/:id' component={OneShotEditor}/>
        <Route path='/stdexpcreator' component={StdExpCreator} />
        <Route path='/stdexpeditor/:id' component={StdExpEditor} />
      </Switch>
    </div>
  </Router>
);

export default Routing;
