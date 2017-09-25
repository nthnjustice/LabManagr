import React from 'react';

import {initAlarm, turnAlarmOff} from './helpers';

import Controls from './Controls';
import Modal from './Modal';

export default class Alarm extends React.Component {
  componentDidMount() {
    initAlarm();
  }
  componentWillUnmount() {
    turnAlarmOff();
  }
  render() {
    return(
      <span id="alarm">
        <div className="section container">
          <div className="row">
            <div className="col l12 center">
              <Controls/>
            </div>
            <div className="clock inactive z-depth-1 waves-effect">
              <span>Not Set</span>
            </div>
          </div>
        </div>
        <Modal/>
      </span>
    );
  }
}
