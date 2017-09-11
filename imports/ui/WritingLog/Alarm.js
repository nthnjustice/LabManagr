import React from 'react';

import AlarmForm from './AlarmForm';

function initAlarm() {
  initAlarmGlobals();
  initAlarmInput();
  initAlarmControls();
  initAlarmObjects();
}

function initAlarmGlobals() {
  alarmSound = new buzz.sound('06_Urban_Beat.mp3');
  alarmInterval = 0;
  alarmTime = 0;
  alarmStartDate = new Date();
  alarmFinishedDate = new Date();

  alarmClock = $('#alarm').find('.clock');
  alarmInput = $('#alarm-input');
  alarmInputLabel = $('#alarm-input-label');
  alarmButton = $('#alarm-switch');
  alarmSoundsButton = $('#alarm-sounds');
}

function initAlarmInput() {
  alarmInput.on('change', function() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();

    let time = formatTime(alarmInput.val());

    alarmTime = new Date(year, month, day, time.hour, time.minutes)

    if (alarmTime) {
      alarmButton.prop('disabled', false);
      alarmClock.find('span').text(alarmInput.val());
    } else {
      alarmButton.prop("disabled", true);
      alarmClock.find('span').text('Not Set');
    }
  });
}

function initAlarmControls() {
  alarmButton.on('click', function() {
    if ($(this).prop('checked')) {
      turnAlarmOn();
    } else{
      turnAlarmOff();
    }
  });
}

function initAlarmObjects() {
  alarmClock.on('click', function() {
    if (alarmClock.hasClass('inactive')) {
      if(alarmTime) {
        turnAlarmOn();
      }
    } else{
      turnAlarmOff();
    }
  });
}

function turnAlarmOn() {
  clearInterval(alarmInterval);

  let hours = alarmTime.getHours();
  let minutes = alarmTime.getMinutes();
  alarmStartDate = new Date();
  let date = new Date();
  let currentHours = 0;
  let currentMin = 0;

  alarmInterval = setInterval(function () {
    date = new Date();
    currentHours = date.getHours();
    currentMin = date.getMinutes();

    if (hours == currentHours && minutes == currentMin) {
      if (alarmSoundsButton.prop('checked')) {
          alarmSound.play();
      }

      $('#alarm-modal').modal('open');
    }
  }, 1000);

  alarmClock.removeClass('inactive');
  alarmInput.prop('disabled', true);
  alarmButton.prop('checked', true);
}

function turnAlarmOff() {
  clearInterval(alarmInterval);
  clearInterval(alarmExcessInterval);

  alarmClock.addClass('inactive');
  alarmInput.prop('disabled', false);
  alarmButton.prop('checked', false);
  alarmInput.val(undefined);
  alarmInputLabel.removeClass('active');
  alarmSoundsButton.prop('checked', false);
  alarmClock.find('span').text('Not Set');
}

function alarmExcess() {
  alarmExcessTime = 0;

  alarmExcessInterval = setInterval(function() {
    alarmExcessTime++;
  }, 1000);
}

function formatTime(timeStr) {
  if (timeStr.split('AM').length > 1) {
    let timeArr = timeStr.split('AM')[0].split(':');
    let hour = Number(timeArr[0]);
    let minutes = Number(timeArr[1]);

    if (hour == 12) {
      hour = 0;
    }

    return {hour, minutes};
  } else {
    let timeArr = timeStr.split('PM')[0].split(':');
    let hour = Number(timeArr[0]);
    let minutes = Number(timeArr[1]);

    if (hour != 12) {
      hour = hour + 12;
    }

    return {hour, minutes};
  }
}

export function secureAlarmStart() {
  return alarmStartDate;
}

export function secureAlarmFinished() {
  return alarmFinishedDate;
}

export function secureAlarmExcess() {
  return alarmExcessTime;
}

export default class Alarm extends React.Component {
  componentDidMount() {
    $('#alarm-input').pickatime({
      twelvehour: true,
      ampmclickable: true
    });

    $('#alarm-modal').modal({
      ready: function(modal, trigger) {
        alarmFinishedDate = new Date;
        alarmExcess();
      },
      complete: function() {
        turnAlarmOff();
      }
    });

    initAlarm();
  }
  render() {
    return(
      <span>
        <div className="section">
          <div id="alarm" className="container">

            <div className="col l12 center">
              <div id="alarm-controls-wrapper">

                <div id="alarm-input-wrapper" className="alarm-inline input-field ">
                  <input id="alarm-input" type="text" ref="min" name="alarm-input"/>
                  <label id="alarm-input-label" htmlFor="alarm-input">
                    Set Time <span className="red-text">*</span>
                  </label>
                </div>

                <div className="switch alarm-inline">
                  <label>
                    Off
                    <input id="alarm-switch" type="checkbox" disabled/>
                    <span className="lever"></span>
                    On
                  </label>
                </div>

                <form id="alarm-sounds-wrapper" className="alarm-inline">
                  <input id="alarm-sounds" type="checkbox" ref="sounds" name="alarm-sounds"/>
                  <label htmlFor="alarm-sounds">Sounds</label>
                </form>

              </div>
            </div>

            <div className="clock inactive z-depth-1 waves-effect">
              <span>Not Set</span>
            </div>

          </div>
        </div>


        <div id="alarm-modal" className="modal modal-fixed-footer">

          <div className="modal-content">

            <h4 className="center-align">Time's Up!</h4>
            <div className="section">
              <h5 className="grey-text">Submit this log when you are ready.</h5>
              <h6 className="grey-text">(The time is still counting.)</h6>
            </div>

            <AlarmForm/>

          </div>

          <div className="modal-footer">
            <a id="alarm-modal-close" className="modal-action modal-close btn-flat grey lighten-4 red-text waves-effect waves-red">
              Close
            </a>
          </div>

        </div>

      </span>
    );
  }
}
