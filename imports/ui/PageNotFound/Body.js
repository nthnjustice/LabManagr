import React from 'react';
import {Link} from 'react-router-dom';

export default class Body extends React.Component {
  render() {
    return(
      <div className="section row">
        <p className="center-align">
          The page you are looking for cannot be found.
        </p>
        <p className="center-align">
          <Link to="/">Click here to return to the homepage.</Link>
        </p>
      </div>
    );
  }
}
