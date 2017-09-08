import React from 'react';

import Log from './Log';
import Live from './Live/Live';
import Goals from './Goals/Goals';
import WritingLogsList from './WritingLogsList';

export default class WritingLogWrapper extends React.Component {
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
          <WritingLogsList/>
        </div>

      </div>
    );
  }
};
