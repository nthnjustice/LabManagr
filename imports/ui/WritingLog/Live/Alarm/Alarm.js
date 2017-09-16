import React from 'react';

import {initAlarm} from './helpers';

import Controls from './Controls';
import Modal from './Modal';

export default class Alarm extends React.Component {
  componentDidMount() {
    initAlarm();
  }
  render() {
    return(
      <span id="alarm">
        <div className="section container">
          <div className="col l12 center">
            <Controls/>
          </div>
          <div className="clock inactive z-depth-1 waves-effect">
            <span>Not Set</span>
          </div>
        </div>
        <Modal/>
      </span>
    );
  }
}
