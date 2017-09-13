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
  alarmInput = $('#alarm__input');
  alarmInputLabel = $('#alarm__input-label');
  alarmButton = $('#alarm__switch');
  alarmSoundsButton = $('#alarm__sounds');
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

      $('#alarm__modal').modal('open');
    }
  }, 1000);

  alarmClock.removeClass('inactive');
  alarmInput.prop('disabled', true);
  alarmButton.prop('checked', true);
}

function turnAlarmOff() {
  clearInterval(alarmInterval);

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
    $('#alarm__input').pickatime({
      twelvehour: true,
      ampmclickable: true
    });

    $('#alarm__modal').modal({
      ready: function(modal, trigger) {
        alarmFinishedDate = new Date;
        alarmExcess();
      },
      complete: function() {
        clearInterval(alarmExcessInterval);
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
              <div id="alarm__controls-wrapper">

                <div id="alarm__input-wrapper" className="alarm__inline input-field ">
                  <input id="alarm__input" type="text" ref="min"/>
                  <label id="alarm__input-label" htmlFor="alarm__input">
                    Set Time <span className="red-text">*</span>
                  </label>
                </div>

                <div className="switch alarm__inline">
                  <label>
                    Off
                    <input id="alarm__switch" type="checkbox" disabled/>
                    <span className="lever"></span>
                    On
                  </label>
                </div>

                <form id="alarm__sounds-wrapper" className="alarm__inline">
                  <input id="alarm__sounds" type="checkbox" ref="sounds"/>
                  <label htmlFor="alarm__sounds">Sounds</label>
                </form>

              </div>
            </div>

            <div className="clock inactive z-depth-1 waves-effect">
              <span>Not Set</span>
            </div>

          </div>
        </div>


        <div id="alarm__modal" className="modal modal-fixed-footer">

          <div className="modal-content">

            <h4 className="center-align">Time's Up!</h4>

            <div className="section">
              <h5 className="grey-text">Submit this log when you are ready.</h5>
              <h6 className="grey-text">(The time is still counting.)</h6>
            </div>

            <div className="section">
              <AlarmForm/>
            </div>

          </div>

          <div className="modal-footer">
            <a id="alarm__modal-btn" className="modal-action modal-close btn-flat grey lighten-4 red-text waves-effect waves-red">
              Close
            </a>
          </div>

        </div>

      </span>
    );
  }
}
