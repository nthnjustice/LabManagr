import React from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return(
      <div className="footer row">
        <div className="col m12 l6 left-align">
          <Link to="/">Login with Existing Account</Link>
        </div>
      </div>
    );
  }
}
