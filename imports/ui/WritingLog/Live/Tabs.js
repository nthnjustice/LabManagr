import React from 'react';

import Alarm from './Alarm/Alarm';
import Timer from './Timer/Timer';
import Stopwatch from './Stopwatch/Stopwatch';

export default class Tabs extends React.Component {
  componentDidMount() {
    $('#live .tabs').tabs();
    setTimeout(function() {
      $('#live .tab .active').trigger('click');
    }, 100);
  }
  render() {
    return(
      <span>
        <ul className="tabs tabs-fixed-width">
          <li className="tab col l4">
            <a href="#alarm">Alarm</a>
          </li>
          <li className="tab col l4">
            <a className="active" href="#timer">Timer</a>
          </li>
          <li className="tab col l4">
            <a href="#stopwatch">Stopwatch</a>
          </li>
        </ul>
        <Alarm/>
        <Timer/>
        <Stopwatch/>
      </span>
    );
  }
}
