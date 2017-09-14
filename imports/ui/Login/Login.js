import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import React from 'react';

import Container from './Container';

export default class Login extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/dashboard');
    }
  }
  render() {
    return(
      <span id="login">
        <Container/>
      </span>
    );
  }
}
