import React from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return(
      <div className="footer row">
        <div className="col s12 m12 l12 right-align">
          <Link to="/">Return to Login</Link>
        </div>
      </div>
    );
  }
}
