import React from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return(
      <div className="col l12 right-align">
        <Link to="/">Return to Login</Link>
      </div>
    );
  }
}
