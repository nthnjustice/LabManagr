import React from 'react';

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
      interval: 0,
      excessInterval: 0,
      sound: new buzz.sound('06_Urban_Beat.mp3'),
      clockText: '0:00'
    };
  }
  componentDidMount() {
    this.initTimer();
    interval = false;
    excessInterval = false;
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
      interval: 0,
      excessInterval: 0,
      sound: new buzz.sound('06_Urban_Beat.mp3'),
      clockText: '0:00'
    });

    $('#timer #input').val(undefined);
    $('#timer #input-label').removeClass('active');
  }
  onInputChange() {
    let newTime = Number($('#timer #input').val().trim());

    if (newTime && newTime >= 0) {
      this.setState({
        time: newTime * 60,
        finishedTime: newTime * 60,
        excessTime: 0,
        totalTime: 0,
        clockText: returnFormattedToSeconds(newTime * 60)
      });
    }
  }
  clockClicked() {
    let clock = $('#timer').find('.clock');

    if (clock.hasClass('inactive')) {
      if(this.state.time > 0) {
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

      if ($('#timer #sounds').prop('checked')){
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
    return(
      <span>
        <div className="col s12 m12 l12 center">
          <div className="input-wrapper inline input-field ">
            <input id="input" type="number" ref="min" onChange={() => {this.onInputChange()}}/>
            <label id="input-label" htmlFor="input">
              Minutes <span className="red-text">*</span>
            </label>
          </div>
          <div id="btn-wrapper" className="inline">
            <a id="start" className="btn-icon waves-effect" onClick={() => {this.startTimer()}}>
              <i className="material-icons small">play_arrow</i>
            </a>
            <a id="pause" className="btn-icon waves-effect" onClick={() => {this.pauseTimer()}}>
              <i className="material-icons small">pause</i>
            </a>
            <a id="reset" className="btn-icon waves-effect" onClick={() => {this.resetTimer()}}>
              <i className="material-icons small">loop</i>
            </a>
          </div>
          <form className="checkbox-wrapper inline">
            <input id="sounds" type="checkbox" ref="sounds"/>
            <label htmlFor="sounds">Sounds</label>
          </form>
        </div>
        <div className="clock inactive z-depth-1 waves-effect" onClick={() => {this.clockClicked()}}>{this.state.clockText}</div>
        <Modal showModal={this.state.modal} closeModal={this.closeModal.bind(this)} time={this.state.totalTime}/>
      </span>
    );
  }
}
