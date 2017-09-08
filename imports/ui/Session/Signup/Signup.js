import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

import VerticalAlign from '../../VerticalAlign';
import SignupWrapper from './SignupWrapper';
import SignupForm from './SignupForm';
import SignupFooter from './SignupFooter';

export default class Signup extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/test');
    }
  }
  render() {
    return(
      <VerticalAlign>
        <SignupWrapper>

          <SignupForm/>
          <SignupFooter/>

        </SignupWrapper>
      </VerticalAlign>
    );
  }
}
