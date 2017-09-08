import React from 'react';
import {Link} from 'react-router-dom';

export default class LoginFooter extends React.Component {
  render() {
    return(
      <div className="row">

        <div className="col l6 left-align">
          <Link to="/recover">Recover Email/Password</Link>
        </div>

        <div className="col l6 right-align">
          <Link to="/signup">Create Account</Link>
        </div>
        
      </div>
    );
  }
}
