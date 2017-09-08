import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router as Router, Route, Switch, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

import Login from '../ui/Session/Login/Login';
import Signup from '../ui/Session/Signup/Signup';
import Recover from '../ui/Recover';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup', '/recover'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/recover" component={Recover}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);
