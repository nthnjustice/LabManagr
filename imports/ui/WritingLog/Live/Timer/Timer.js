import React from 'react';

import Controls from './Controls';

export default class Timer extends React.Component {
  render() {
    return(
      <span id="timer">
        <div className="section container">
          <div className="row">
            <Controls/>
          </div>
        </div>
      </span>
    );
  }
}
