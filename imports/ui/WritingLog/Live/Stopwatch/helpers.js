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
  $('#stopwatch #start').click(function() {
    if (stopwatchClock.hasClass('inactive')) {
      startStopwatch();
    }
  });

  $('#stopwatch #pause').click(function() {
    pauseStopwatch();
  });

  $('#stopwatch #reset').click(function() {
    resetStopwatch();
  });
}

function initStopwatchObjects() {
  stopwatchClock.click(function() {
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
  $('#stopwatch .submit').removeClass('disabled');
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

function resetStopwatch(){
  clearInterval(stopwatchInterval);

  stopwatchDigits.text(returnFormattedToMilliseconds(0));
  localStorage.stopwatchBeginingTimestamp = 0;
  localStorage.stopwatchRunningTime = 0;

  stopwatchClock.addClass('inactive');
  $('#stopwatch .submit').addClass('disabled');
}

function returnFormattedToMilliseconds(time){
  let seconds = Math.floor((time/1000) % 60);
  let minutes = Math.floor((time/(1000*60)) % 60);
  let hours = Math.floor((time/(1000*60*60)) % 24);

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes}:${seconds}`;
}

function secureStopwatchTime() {
  return stopwatchTime;
}

export {initStopwatch, resetStopwatch, secureStopwatchTime};
