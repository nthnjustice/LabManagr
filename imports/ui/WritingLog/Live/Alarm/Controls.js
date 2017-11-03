import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import Modal from './Modal';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      start: new Date(),
      time: '',
      timePickerDisabled: false,
      sound: new buzz.sound('06_Urban_Beat.mp3'),
      soundsChecked: false,
      toggleDisabled: true,
      toggleOn: false,
      clockText: 'Not Set'
    };
  }
  componentDidMount() {
    interval = false;
    Checkbox.defaultProps.disableTouchRipple = true;
  }
  onInputChange(event, date) {
    this.setState({time: date});

    if (this.state.time) {
      let hours = Number(this.state.time.getHours());
      let minutes = Number(this.state.time.getMinutes());
      let str = '';

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      if (hours > 12) {
        str = `${hours - 12}:${minutes} pm`;
      } else {
        str = `${hours}:${minutes} am`;
      }

      this.setState({
        toggleDisabled: false,
        clockText: str
      });
    } else {
      this.setState({
        toggleDisabled: true,
        clockText: 'Not Set'
      });
    }
  }
  onToggle(event, value) {
    if (value) {
      this.turnAlarmOn();
    } else {
      this.turnAlarmOff();
    }
  }
  updateCheck() {
    this.setState((oldState) => {
      return {
        soundsChecked: !oldState.checked,
      };
    });
  }
  clockClicked() {
    if ($('#alarm').find('.clock').hasClass('inactive')) {
      if (this.state.time) {
        this.turnAlarmOn();
      }
    } else {
      this.turnAlarmOff();
    }
  }
  turnAlarmOn() {
    if (interval) {
      clearInterval(interval);
    }

    this.setState({
      start: new Date(),
      timePickerDisabled: true,
      toggleOn: true
    });

    $('#alarm').find('.clock').removeClass('inactive');

    interval = setInterval(this.tick.bind(this), 1000);
  }
  tick() {
    let hours = this.state.time.getHours();
    let minutes = this.state.time.getMinutes();
    let date = new Date();
    let currentHours = date.getHours();
    let currentMin = date.getMinutes();

    if (hours == currentHours && minutes == currentMin) {
      if (this.state.soundsChecked) {
        this.state.sound.play().fadeIn();
      }

      this.setState({modal: true});
    }
  }
  turnAlarmOff() {
    if (interval) {
      clearInterval(interval);
    }

    this.setState({
      start: new Date(),
      timePickerDisabled: false,
      toggleOn: false
    });

    $('#alarm').find('.clock').addClass('inactive');
  }
  closeModal(value) {
    if (interval) {
      clearInterval(interval);
    }

    this.turnAlarmOff();
    this.setState({modal: value});
  }
  render() {
    let inputLabel = <span>Set Time <span className="red-text">*</span></span>;

    let toggleStyles = {
      display: 'inline-block'
    };

    let checkboxStyles = {
      display: 'inline-block',
      marginLeft: '1rem'
    };

    let checkboxLabelStyles = {}

    return(
      <span>
        <div className="row center">
          <MuiThemeProvider>
            <TimePicker
              hintText={inputLabel}
              autoOk={true}
              onChange={this.onInputChange.bind(this)}
              disabled={this.state.timePickerDisabled}
              id="timePicker"
            />
          </MuiThemeProvider>
        </div>
        <div className="row center">
          <div className="inline">
            <MuiThemeProvider>
              <Toggle
                label="On"
                labelPosition="right"
                style={toggleStyles}
                disabled={this.state.toggleDisabled}
                onToggle={this.onToggle.bind(this)}
                toggled={this.state.toggleOn}
              />
            </MuiThemeProvider>
          </div>
          <div className="inline">
            <MuiThemeProvider>
              <Checkbox
                label="sounds"
                style={checkboxStyles}
                checked={this.state.soundsChecked}
                onCheck={this.updateCheck.bind(this)}
              />
            </MuiThemeProvider>
          </div>
        </div>
        <div className="section row">
          <br/>
          <div className="clock inactive z-depth-1 waves-effect" onClick={() => {this.clockClicked()}}>{this.state.clockText}</div>
        </div>
        <Modal showModal={this.state.modal} closeModal={this.closeModal.bind(this)} start={this.state.start}/>
      </span>
    );
  }
}
