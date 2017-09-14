import React from 'react';

import UserLogs from './UserLogs';

export default class Live extends React.Component {
  componentDidMount() {
    $('#goals__tabs').tabs();

    setTimeout(function() {
      $('#goals__active-tab').trigger('click');
    }, 100);
  }
  render() {
    return(
      <div className="card large hoverable">

        <div id="userLogs__header" className="indigo darken-4">
          <h5 className="white-text">Posted Logs</h5>
        </div>

        <UserLogs/>

    </div>
    );
  }
}
