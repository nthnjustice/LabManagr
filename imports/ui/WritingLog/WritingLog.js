import React from 'react';

import Log from './Log';
import Live from './Live';
import Goals from './Goals';
import UserLogs from './UserLogs';
import WeeklyLogs from './WeeklyLogs';
import TotalLogs from './TotalLogs';

export default class WritingLog extends React.Component {
  render() {
    return(
      <div className="row">

        <div className="col l3">
          <Log/>
        </div>

        <div className="col l6">
          <Live/>
        </div>

        <div className="col l3">
          <Goals/>
        </div>

        <div className="col l3">
          <UserLogs/>
        </div>

        <WeeklyLogs/>
        <TotalLogs/>

      </div>
    );
  }
};
