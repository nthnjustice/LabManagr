import React from 'react';

import {initStopwatch, resetStopwatch} from './helpers';

import Controls from './Controls';
import Form from './Form';

export default class Stopwatch extends React.Component {
  componentDidMount() {
    initStopwatch();
  }
  componentWillUnmount() {
    resetStopwatch();
  }
  render() {
    return(
      <span id="stopwatch">
        <div className="section container">
          <div className="col l12 center">
            <Controls/>
          </div>
          <div className="clock inactive z-depth-1 waves-effect">
            <span>0:00:00.0</span>
          </div>
          <Form/>
        </div>
      </span>
    );
  }
}
