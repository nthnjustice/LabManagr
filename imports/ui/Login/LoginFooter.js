import React from 'react';
import {Link} from 'react-router-dom';

export default class LoginFooter extends React.Component {
  render() {
    return(
      <div id="login__link-wrapper" className="row">

        <div className="col l6 left-align">
          <Link className="login__link" to="/recover">Recover Email/Password</Link>
        </div>

        <div className="col l6 right-align">
          <Link className="login__link" to="/signup">Create Account</Link>
        </div>

      </div>
    );
  }
}
