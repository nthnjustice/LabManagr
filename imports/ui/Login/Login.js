import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import React from 'react';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
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
        <div className="row">
          <div className="col l4 offset-l4">
            <div className="card-panel hoverable">

              <h2 className="center-align cyan-text text-darken-3">LabManagr</h2>
              <div className="divider cyan darken-3"></div>

              <div className="section">
                <h4>Login</h4>
                <LoginForm/>
                <LoginFooter/>
              </div>

            </div>
          </div>
        </div>
      </VerticalAlign>
    );
  }
}
