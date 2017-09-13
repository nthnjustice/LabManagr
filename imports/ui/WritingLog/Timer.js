import React from 'react';

import TimerForm from './TimerForm';

function initTimer() {
  initTimerGlobals();
  initTimerInput();
  initTimerControls();
  initTimerObjects();
}

function initTimerGlobals() {
  timerTime = 0;
  timerFinishedTime = 0;
  timerInterval = 0;
  timerExcessInterval = 0;
  timerSound = new buzz.sound('06_Urban_Beat.mp3');

  timerClock = $('#timer').find('.clock');
  timerClock.text(returnFormattedToSeconds(timerTime));
  timerInput = $('#timer__input');
  timerInputLabel = $('#timer__input-label');
  timerSoundsButton = $('#timer__sounds');
}

function initTimerInput() {
  timerInput.val(undefined);
  timerInputLabel.removeClass('active');

  timerInput.on('change', function() {
    let newTime = Number(timerInput.val().trim());

    if (newTime && newTime >= 0) {
      timerFinishedTime = newTime * 60;
      timerTime = newTime * 60;
      timerClock.text(returnFormattedToSeconds(timerTime));
    }
  });
}

function initTimerControls() {
  $('#timer__start').on('click', function() {
    if (timerTime > 0) {
      startTimer();
    }
  });

  $('#timer__pause').on('click', function() {
    pauseTimer();
  });

  $('#timer__reset').on('click', function() {
    resetTimer();
  });
}

function initTimerObjects() {
  timerClock.on('click', function() {
    if (timerClock.hasClass('inactive')) {
      if(timerTime > 0) {
        startTimer();
      }
    } else{
      pauseTimer();
    }
  });
}

function startTimer() {
  clearInterval(timerInterval);
  clearInterval(timerExcessInterval);

  timerInterval = setInterval(function() {
    timerTime--;
    timerClock.text(returnFormattedToSeconds(timerTime));

    timerInput.prop('disabled', true);
    timerClock.removeClass('inactive');

    if (timerTime <= 0) {
      if (timerSoundsButton.prop('checked')){
        timerSound.play().fadeIn();
      }

      timerClock.text(returnFormattedToSeconds(0));

      $('#timer__modal').modal('open');
    }
  }, 1000);
}

function pauseTimer(){
  clearInterval(timerInterval);
  clearInterval(timerExcessInterval);

  timerInput.prop('disabled', false);
  timerClock.addClass('inactive');
}

function resetTimer(){
  pauseTimer();
  initTimer();
}

function timerExcess() {
  timerExcessTime = 0;

  timerExcessInterval = setInterval(function() {
    timerExcessTime++;
  }, 1000);
}

function returnFormattedToSeconds(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.round(time - minutes * 60);

  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ":" + seconds;
}

export function secureTimerTime() {
  return secureTimerFinishedTime + timerExcessTime;
}

export default class Timer extends React.Component {
  componentDidMount() {
    $('#timer__modal').modal({
      ready: function(modal, trigger) {
        secureTimerFinishedTime = timerFinishedTime;
        resetTimer();
        timerExcess();
      }
    });

    initTimer();
  }
  componentWillUnmount() {
    resetTimer();
  }
  render() {
    return(
      <span>
        <div id="timer" className="container">
          <div className="col l12 center">

            <div id="timer__input-wrapper" className="timer__inline input-field ">
              <input id="timer__input" type="number" ref="min"/>
              <label id="timer__input-label" htmlFor="timer__input">
                Minutes <span className="red-text">*</span>
              </label>
            </div>

            <div id="timer__btn-wrapper" className="timer__inline">
              <a id="timer__start" className="timer__btn waves-effect">
                <i className="material-icons small">play_arrow</i>
              </a>

              <a id="timer__pause" className="timer__btn waves-effect">
                <i className="material-icons small">pause</i>
              </a>

              <a id="timer__reset" className="timer__btn waves-effect">
                <i className="material-icons small">loop</i>
              </a>
            </div>

            <form className="timer__inline">
              <input id="timer__sounds" type="checkbox" ref="sounds"/>
              <label htmlFor="timer__sounds">Sounds</label>
            </form>

          </div>

          <div className="clock inactive z-depth-1 waves-effect">0:00</div>

        </div>

        <div id="timer__modal" className="modal modal-fixed-footer">

          <div className="modal-content">

            <h4 className="center-align">Time's Up!</h4>

            <div className="section">
              <h5 className="grey-text">Submit this log when you are ready.</h5>
              <h6 className="grey-text">(The timer is still running.)</h6>
            </div>

            <div className="section">
              <TimerForm/>
            </div>
            
          </div>

          <div className="modal-footer">
            <a className="modal-action modal-close btn-flat grey lighten-4 red-text waves-effect waves-red">
              Close
            </a>
          </div>

        </div>
      </span>
    );
  }
}
