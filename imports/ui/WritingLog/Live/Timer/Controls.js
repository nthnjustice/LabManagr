import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';

import {returnFormattedToSeconds} from './helpers';

import Modal from './Modal';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      time: 0,
      finishedTime: 0,
      excessTime: 0,
      totalTime: 0,
      sound: new buzz.sound('06_Urban_Beat.mp3'),
      checked: false,
      clockText: '0:00',
      minErr: '*',
      minVal: ''
    };
  }
  componentDidMount() {
    this.initTimer();
    interval = false;
    excessInterval = false;
    Checkbox.defaultProps.disableTouchRipple = true;
  }
  componentWillUnmount() {
    this.resetTimer();
  }
  initTimer() {
    this.setState({
      time: 0,
      finishedTime: 0,
      excessTime: 0,
      totalTime: 0,
      sound: new buzz.sound('06_Urban_Beat.mp3'),
      checked: false,
      clockText: '0:00',
      minErr: '*',
      minVal: ''
    });

    $('#timer #input').val(undefined);
    $('#timer #input-label').removeClass('active');
  }
  onInputChange(event) {
    let newTime = event.target.value;

    if (newTime <= 0) {
      this.setState({
        minErr: '* invalid time',
        minVal: 'invalid'
      });
    } else if (newTime && newTime >= 0) {
      this.setState({
        time: newTime * 60,
        finishedTime: newTime * 60,
        excessTime: 0,
        totalTime: 0,
        clockText: returnFormattedToSeconds(newTime * 60),
        minErr: '*',
        minVal: ''
      });
    }
  }
  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }
  clockClicked() {
    let clock = $('#timer').find('.clock');

    if (clock.hasClass('inactive')) {
      if (this.state.time > 0) {
        this.startTimer();
      }
    } else{
      this.pauseTimer();
    }
  }
  startTimer() {
    if (interval) {
      clearInterval(interval);
    }
    if (excessInterval) {
      clearInterval(excessInterval);
    }

    $('#timer #input').prop('disabled', true);
    $('#timer').find('.clock').removeClass('inactive');

    interval = setInterval(this.tick.bind(this), 1000);
  }
  tick() {
    this.setState({
      time: this.state.time - 1,
      clockText: returnFormattedToSeconds(this.state.time)
    });

    if (this.state.time <= 0) {
      this.pauseTimer();

      if (this.state.checked){
        this.state.sound.play().fadeIn();
      }

      this.setState({
        modal: true,
        clockText: '0:00'
      });

      this.excessTimer();
    }
  }
  pauseTimer(){
    if (interval) {
      clearInterval(interval);
    }
    if (excessInterval) {
      clearInterval(excessInterval);
    }

    $('#timer #input').prop('disabled', false);
    $('#timer').find('.clock').addClass('inactive');
  }
  resetTimer(){
    if (interval) {
      clearInterval(interval);
    }
    if (excessInterval) {
      clearInterval(excessInterval);
    }

    this.pauseTimer();
    this.initTimer();
  }
  excessTimer() {
    excessInterval = setInterval(this.tickExcess.bind(this), 1000);
  }
  tickExcess() {
    this.setState({excessTime: this.state.excessTime + 1});

    this.setState({totalTime: this.state.finishedTime + this.state.excessTime});
  }
  closeModal(value) {
    if (interval) {
      clearInterval(interval);
    }
    if (excessInterval) {
      clearInterval(excessInterval);
    }

    this.resetTimer();
    this.setState({modal: value});
  }
  render() {
    let styles = {
      display: 'inline-block',
      width: '50px',
      marginLeft: '0.5rem',
      position: 'absolute',
      top: '3.5rem'
    };

    return(
      <span>
        <div className="controls-wrapper row">
          <div className="col s12 m12 l12 center">
            <div className="input-wrapper inline input-field">
              <input id="input" className={this.state.minVal} type="number" onChange={this.onInputChange.bind(this)}/>
              <label id="input-label" htmlFor="input">
                Minutes <span className="red-text">{this.state.minErr}</span>
              </label>
            </div>
            <div className="inline">
              <a id="start" className="btn-icon waves-effect" onClick={() => {this.startTimer()}}>
                <i className="material-icons small">play_arrow</i>
              </a>
              <a id="pause" className="btn-icon waves-effect" onClick={() => {this.pauseTimer()}}>
                <i className="material-icons small">pause</i>
              </a>
              <a id="reset" className="btn-icon waves-effect" onClick={() => {this.resetTimer()}}>
                <i className="material-icons small">loop</i>
              </a>
              <MuiThemeProvider>
                <Checkbox
                  label="Sounds"
                  style={styles}
                  checked={this.state.checked}
                  onCheck={this.updateCheck.bind(this)}
                />
              </MuiThemeProvider>
            </div>
          </div>
        </div>
        <div className="clock inactive z-depth-1 waves-effect" onClick={this.clockClicked.bind(this)}>{this.state.clockText}</div>
        <Modal showModal={this.state.modal} closeModal={this.closeModal.bind(this)} time={this.state.totalTime}/>
      </span>
    );
  }
}
