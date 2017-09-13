import React from 'react';

import StopwatchForm from './StopwatchForm';

function initStopwatch() {
  initStopwatchGlobals();
  initStopwatchControls();
  initStopwatchObjects();
}

function initStopwatchGlobals() {
  stopwatchInterval = 0;
  localStorage.stopwatchRunningTime = 0;

  stopwatchClock = $('#stopwatch').find('.clock');
  stopwatchDigits = stopwatchClock.find('span');
}

function initStopwatchControls() {
  $('#stopwatch__start').on('click', function() {
    if (stopwatchClock.hasClass('inactive')) {
      startStopwatch();
    }
  });

  $('#stopwatch__pause').on('click', function() {
    pauseStopwatch();
  });

  $('#stopwatch__reset').on('click', function() {
    resetStopwatch();
  });
}

function initStopwatchObjects() {
  stopwatchClock.on('click', function() {
    if (stopwatchClock.hasClass('inactive')) {
      startStopwatch();
    } else {
      pauseStopwatch();
    }
  });
}

function startStopwatch() {
  clearInterval(stopwatchInterval);

  let startTimestamp = new Date().getTime();
  let runningTime = 0;

  localStorage.stopwatchBeginingTimestamp = startTimestamp;

  if (Number(localStorage.stopwatchRunningTime)) {
    runningTime = Number(localStorage.stopwatchRunningTime);
  } else {
    localStorage.stopwatchRunningTime = 1;
  }

  stopwatchInterval = setInterval(function() {
    stopwatchTime = new Date().getTime() - startTimestamp + runningTime;

    stopwatchDigits.text(returnFormattedToMilliseconds(stopwatchTime));
  }, 100);

  stopwatchClock.removeClass('inactive');
  $('#stopwatch__submit').removeClass('disabled');
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);

  if (Number(localStorage.stopwatchBeginingTimestamp)) {
    let beginning = Number(localStorage.stopwatchBeginingTimestamp);
    let runningTime = Number(localStorage.stopwatchRunningTime) + new Date().getTime() - beginning;

    localStorage.stopwatchBeginingTimestamp = 0;
    localStorage.stopwatchRunningTime = runningTime;

    stopwatchClock.addClass('inactive');
  }
}

export function resetStopwatch(){
  clearInterval(stopwatchInterval);

  stopwatchDigits.text(returnFormattedToMilliseconds(0));
  localStorage.stopwatchBeginingTimestamp = 0;
  localStorage.stopwatchRunningTime = 0;

  stopwatchClock.addClass('inactive');
  $('#stopwatch__submit').addClass('disabled');
}

function returnFormattedToMilliseconds(time){
  let milliseconds = Math.floor((time % 1000) / 100);
  let seconds = Math.floor((time/1000) % 60);
  let minutes = Math.floor((time/(1000*60)) % 60);
  let hours = Math.floor((time/(1000*60*60)) % 24);

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;


  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export function secureStopwatchTime() {
  return stopwatchTime;
}

export default class Stopwatch extends React.Component {
  componentDidMount() {
    initStopwatch();
  }
  componentWillUnmount() {
    resetStopwatch();
  }
  render() {
    return(
      <div id="stopwatch" className="container">

        <div className="col l12 center">

          <a id="stopwatch__start" className="stopwatch__btn waves-effect">
            <i className="material-icons small">play_arrow</i>
          </a>

          <a id="stopwatch__pause" className="stopwatch__btn waves-effect">
            <i className="material-icons small">pause</i>
          </a>

          <a id="stopwatch__reset" className="stopwatch__btn waves-effect">
            <i className="material-icons small">loop</i>
          </a>

        </div>

        <div className="clock inactive z-depth-1 waves-effect">
          <span>0:00:00.0</span>
        </div>

        <StopwatchForm/>

      </div>
    );
  }
}
