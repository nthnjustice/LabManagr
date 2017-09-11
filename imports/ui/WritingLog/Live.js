import React from 'react';

import Alarm from './Alarm';
import Timer from './Timer';
import Stopwatch from './Stopwatch';

export default class Live extends React.Component {
  componentDidMount() {
    $('#tabs-clocks').tabs();
  }
  render() {
    return(
      <div className="card-panel hoverable">

        <h5>Live Writing Session</h5>
        <div className="divider"></div>

        <div className="row">

          <div className="col l12">
            <ul id="tabs-clocks" className="tabs">
              <li className="tab col l4"><a href="#alarm">Alarm</a></li>
              <li className="tab col l4"><a className="active" href="#timer">Timer</a></li>
              <li className="tab col l4"><a href="#stopwatch">Stopwatch</a></li>
            </ul>
          </div>

          <Alarm/>
          <Timer/>
          <Stopwatch/>

        </div>

      </div>
    );
  }
}
