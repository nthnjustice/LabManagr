import React from 'react';

import {resetTimer, timerExcess} from './helpers';

import Form from './Form';

export default class Modal extends React.Component {
  componentDidMount() {
    $('#timer .modal').modal({
      ready: function() {
        secureTimerFinishedTime = timerFinishedTime;
        resetTimer();
        timerExcess();
      }
    });
  }
  componentWillUnmount() {
    resetTimer();
  }
  render() {
    return(
      <div className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4 className="center-align">Time's Up!</h4>
          <div className="section">
            <h5 className="grey-text">Submit this log when you are ready.</h5>
            <h6 className="grey-text">(The timer is still running.)</h6>
          </div>
          <div className="section">
            <Form/>
          </div>
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close btn-flat grey lighten-4 red-text waves-effect waves-red">
            Close
          </a>
        </div>
      </div>
    );
  }
}
