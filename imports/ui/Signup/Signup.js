import {Accounts} from 'meteor/accounts-base';
import React from 'react';
import {Link} from 'react-router-dom';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
import SignupForm from './SignupForm';
import SignupFooter from './SignupFooter';

export default class Signup extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/');
    }
  }
  render() {
    return(
      <VerticalAlign>
        <div className="row">
          <div className="col l6 offset-l3">
            <div className="card-panel hoverable">

              <h2 className="center-align cyan-text text-darken-3">LabManagr</h2>
              <div className="divider cyan darken-3"></div>

              <div className="section">
                <h4>Register</h4>
                <SignupForm/>
                <SignupFooter/>
              </div>

            </div>
          </div>
        </div>
      </VerticalAlign>
    );
  }
}
