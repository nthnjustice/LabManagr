import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router as Router, Route, Redirect} from 'react-router-dom';
import {AnimatedSwitch} from 'react-router-transition'
import createBrowserHistory from 'history/createBrowserHistory';

import Login from '../ui/Login/Login';
import Signup from '../ui/Signup/Signup';
import RecoverAccount from '../ui/RecoverAccount/RecoverAccount';
import Dashboard from '../ui/Dashboard/Dashboard';
import PageNotFound from '../ui/PageNotFound/PageNotFound';

let history = createBrowserHistory();

let unauthenticatedPages = ['/', '/signup', '/recover'];
let authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
  let pathname = history.location.pathname;
  let isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  let isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
  <Router history={history}>
    <AnimatedSwitch
      atEnter={{opacity: 0}}
      atLeave={{opacity: 0}}
      atActive={{opacity: 1}}
      className="router-wrapper"
    >
      <Route exact path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/recover" component={RecoverAccount}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route component={PageNotFound}/>
    </AnimatedSwitch>
  </Router>
);
