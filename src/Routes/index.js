import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { MainRoute, PrivateRoute } from './utils';

import Login from '../Login';
import MainAppView from '../Campist';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <MainRoute />} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/app" component={MainAppView} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

const RoutesContainer = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};
export default RoutesContainer;
