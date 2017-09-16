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
  alarmInput = $('#alarm #input');
  alarmInputLabel = $('#alarm #input-label');
  alarmButton = $('#alarm #switch');
  alarmSoundsButton = $('#alarm #sounds');
}

function initAlarmInput() {
  alarmInput.change(function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const time = formatTime(alarmInput.val());

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
  alarmButton.click(function() {
    if ($(this).prop('checked')) {
      turnAlarmOn();
    } else{
      turnAlarmOff();
    }
  });
}

function initAlarmObjects() {
  alarmClock.click( function() {
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

  const hours = alarmTime.getHours();
  const minutes = alarmTime.getMinutes();

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

      $('#alarm .modal').modal('open');
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

function secureAlarmStart() {
  return alarmStartDate;
}

function secureAlarmFinished() {
  return alarmFinishedDate;
}

function secureAlarmExcess() {
  return alarmExcessTime;
}

export {
  initAlarm,
  alarmExcess,
  turnAlarmOff,
  secureAlarmStart,
  secureAlarmFinished,
  secureAlarmExcess
};
