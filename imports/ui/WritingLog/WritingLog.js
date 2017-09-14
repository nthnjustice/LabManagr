import React from 'react';

import Log from './Log';
import Live from './Live';
import Goals from './Goals';
import UserLogsWrapper from './UserLogsWrapper';
//import WeeklyLogs from './WeeklyLogs';
import TotalLogs from './TotalLogs';

export default class WritingLog extends React.Component {
  render() {
    return(
      <div className="row">

        <div className="col l3">
          <Log/>
        </div>

        <div className="col l5">
            <Live/>
        </div>

        <div className="col l4">
          <Goals/>
        </div>

        <div className="col l4">
          <UserLogsWrapper/>
        </div>

        {/* <WeeklyLogs/>
        <TotalLogs/> */}

      </div>
    );
  }
}
