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
  timerInput = $('#timer #input');
  timerInputLabel = $('#timer #input-label');
  timerSoundsButton = $('#timer #sounds');
}

function initTimerInput() {
  timerInput.val(undefined);
  timerInputLabel.removeClass('active');

  timerInput.change(function() {
    let newTime = Number(timerInput.val().trim());

    if (newTime && newTime >= 0) {
      timerFinishedTime = newTime * 60;
      timerTime = newTime * 60;
      timerClock.text(returnFormattedToSeconds(timerTime));
    }
  });
}

function initTimerControls() {
  $('#timer #start').click(function() {
    if (timerTime > 0) {
      startTimer();
    }
  });

  $('#timer #pause').click(function() {
    pauseTimer();
  });

  $('#timer #reset').click(function() {
    resetTimer();
  });
}

function initTimerObjects() {
  timerClock.click(function() {
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

      $('#timer .modal').modal('open');
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

  return `${minutes}:${seconds}`;
}

function fetchTimerTime() {
  return secureTimerFinishedTime + timerExcessTime;
}

export {initTimer, resetTimer, timerExcess, fetchTimerTime};
