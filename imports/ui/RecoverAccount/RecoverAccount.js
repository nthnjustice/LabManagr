import React from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

import VerticalAlign from '../VerticalAlign/VerticalAlign';

export default class Recover extends React.Component {
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

                <h4>Recover</h4>

                <div className="row">
                  <p className="center-align">
                    To recover the login credentials for your account, please email
                    <strong> n(dot)justice(at)outlook(dot)com</strong>.
                  </p>
                </div>

                <div className="col l12 right-align">
                  <Link to="/">Return to Login</Link>
                </div>

              </div>

            </div>
          </div>
        </div>
      </VerticalAlign>
    );
  }
}
