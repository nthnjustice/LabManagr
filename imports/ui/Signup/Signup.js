import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Link} from 'react-router-dom';

import Container from './Container'

export default class Signup extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/dashboard');
    }
  }
  render() {
    return(
      <span id="signup">
        <Container/>
      </span>
    );
  }
}
