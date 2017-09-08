import React from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

import VerticalAlign from '../../VerticalAlign';
import LoginWrapper from './LoginWrapper';
import LoginForm from './LoginForm';
import LoginFooter from './LoginFooter';

export default class Login extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/dashboard');
    }
  }
  render() {
    return(
      <VerticalAlign>
        <LoginWrapper>

          <LoginForm/>
          <LoginFooter/>

        </LoginWrapper>
      </VerticalAlign>
    );
  }
}
