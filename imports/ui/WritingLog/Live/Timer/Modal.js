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
      <div className="modal">
        <div className="modal-content">
          <h4 className="center-align">Time's Up!</h4>
          <div className="section">
            <h5 className="grey-text">Submit this log when you are ready.</h5>
            <p className="grey-text">(The timer is still running.)</p>
          </div>
          <Form/>
          <div className="footer">
            <p className="right-align">
              <a className="modal-action modal-close btn-flat grey lighten-4 red-text waves-effect waves-red">
                Close
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
