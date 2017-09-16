import React from 'react';

import {initAlarm} from './helpers';

export default class Controls extends React.Component {
  componentDidMount() {
    $('#alarm #input').pickatime({
      twelvehour: true,
      ampmclickable: true
    });

    initAlarm();
  }
  render() {
    return(
      <span>
        <div className="input-wrapper inline input-field ">
          <input id="input" type="text" ref="min"/>
          <label id="input-label" htmlFor="input">
            Set Time <span className="red-text">*</span>
          </label>
        </div>
        <div className="switch inline">
          <label>
            Off
            <input id="switch" type="checkbox" disabled/>
            <span className="lever"></span>
            On
          </label>
        </div>
        <form className="checkbox-wrapper inline">
          <input id="sounds" type="checkbox" ref="sounds"/>
          <label htmlFor="sounds">Sounds</label>
        </form>
      </span>
    );
  }
}
