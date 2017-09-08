import React from 'react';
import {Link} from 'react-router-dom';

export default class LoginFooter extends React.Component {
  render() {
    return(
      <div className="row">

        <div className="col l6 left-align">
          <Link to="/">Login with Existing Account</Link>
        </div>
        
      </div>
    );
  }
}
