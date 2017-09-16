import React from 'react';

import {initTimer, resetTimer} from './helpers';

import Controls from './Controls';
import Modal from './Modal';

export default class Timer extends React.Component {
  componentDidMount() {
    initTimer();
  }
  componentWillUnmount() {
    resetTimer();
  }
  render() {
    return(
      <span id="timer">
        <div className="section container">
          <div className="col l12 center">
            <Controls/>
          </div>
          <div className="clock inactive z-depth-1 waves-effect">0:00</div>
        </div>
        <Modal/>
      </span>
    );
  }
}
