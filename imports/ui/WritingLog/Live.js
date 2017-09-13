import React from 'react';

import Alarm from './Alarm';
import Timer from './Timer';
import Stopwatch from './Stopwatch';

export default class Live extends React.Component {
  componentDidMount() {
    $('#live__tabs-clock').tabs();

    setTimeout(function() {
      $('#live__timer-tab').trigger('click');
    }, 100);
  }
  render() {
    return(
      <div className="card large hoverable">

        <div id="live__header" className="indigo darken-4">
          <h5 className="white-text">Live Session</h5>
        </div>

        <div className="row">

          <ul id="live__tabs-clock" className="tabs tabs-fixed-width">
            <li className="tab col l4"><a href="#alarm">Alarm</a></li>
            <li className="tab col l4"><a id="live__timer-tab" className="active" href="#timer">Timer</a></li>
            <li className="tab col l4"><a href="#stopwatch">Stopwatch</a></li>
          </ul>

          <Alarm/>
          <Timer/>
          <Stopwatch/>

        </div>

      </div>
    );
  }
}
