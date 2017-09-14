import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import React from 'react';

import Container from './Container';

export default class RecoverAccount extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/dashboard');
    }
  }
  render() {
    return(
      <span id="recover-account">
        <Container/>
      </span>
    );
  }
}
