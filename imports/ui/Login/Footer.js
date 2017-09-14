import React from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return(
      <div className="footer row">
        <div className="col l6 left-align">
          <Link className="link" to="/recover">Recover Email/Password</Link>
        </div>
        <div className="col l6 right-align">
          <Link className="link" to="/signup">Create Account</Link>
        </div>
      </div>
    );
  }
}
