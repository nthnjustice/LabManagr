import {Meteor} from 'meteor/meteor';
import React from 'react';

import {formatDate, formatMonth} from './helpers';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      dateErr: '*',
      dateVal: 'datepicker',
      titleErr: '*',
      titleVal: '',
      hrVal: '',
      minVal: ''
    };
  }
  componentDidMount() {
    $('#log #date').pickadate({closeOnSelect: true});
  }
  validateDate(date) {
    if (!date) {
      this.setState({dateErr: "* can't be blank", dateVal: 'datepicker invalid'});
      return false;
    } else {
      this.setState({dateErr: '*', dateVal: 'datepicker valid'});
      return true;
    }
  }
  validateTitle(title) {
    if (!title) {
      this.setState({titleErr: "* can't be blank", titleVal: 'invalid'});
      return false;
    } else {
      this.setState({titleErr: '*', titleVal: 'valid'});
      return true;
    }
  }
  validateTime(hr, min) {
    if (!hr && !min) {
      this.setState({error: 'invalid time', hrVal: 'invalid', minVal: 'invalid'});
      return false;
    } else if (hr < 0 || min < 0) {
      this.setState({error: 'invalid time', hrVal: 'invalid', minVal: 'invalid'});
      return false;
    } else if (hr == 0 && min == 0) {
      this.setState({error: 'invalid time', hrVal: 'invalid', minVal: 'invalid'});
      return false;
    } else {
      this.setState({error: '', hrVal: 'valid', minVal: 'valid'});
      return true;
    }
  }
  resetForm() {
    $('#log #date').val(undefined);
    $('#log #date-label').removeClass('active');
    $('#log #title').val(undefined);
    $('#log #title-label').removeClass('active');
    $('#log #hr').val(undefined);
    $('#log #hr-label').removeClass('active');
    $('#log #min').val(undefined);
    $('#log #min-label').removeClass('active');
  }
  onSubmit(e) {
    e.preventDefault();

    let date = this.refs.date.value.trim();

    const title = this.refs.title.value.trim();
    const hr = Number(this.refs.hr.value.trim());
    const min = Number(this.refs.min.value.trim());

    const dateVal = this.validateDate(date);
    const titleVal = this.validateTitle(title);

    let timeVal = false;

    if (dateVal && titleVal) {
      timeVal = this.validateTime(hr, min);
    }

    if (timeVal) {
      const minTot = min + (hr * 60);
      const hours = Math.floor(minTot / 60);
      const minutes = minTot % 60;
      date = formatDate(date);

      Meteor.call('writingLogs.insert', title, hours, minutes, date, (err) => {
        if (!err) {
          this.setState({
            error: '',
            dateErr: '*',
            dateVal: 'datepicker',
            titleErr: '*',
            titleVal: '',
            hrVal: '',
            minVal: ''
          });
          this.resetForm();
          const $msg = $('<span class="green-text text-accent-3">Writing Log Saved</span>')
          Materialize.toast($msg, 5000, 'rounded');
        } else {
          const $msg = $('<span class="red-text">Error: Writing Log Not Saved</span>')
          Materialize.toast($msg, 5000, 'rounded');
        }
      });
    }
  }
  render() {
    return(
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <div className="row red lighten-5">
          {
            this.state.error
              ? <p className="error center-align red-text text-darken-4">{this.state.error}</p>
              : undefined
          }
        </div>
        <div className="row">
          <div className="input-field col l12">
            <input id="date" className={this.state.dateVal} type="text" ref="date"/>
            <label id="date-label" htmlFor="date">
              Date <span className="red-text">{this.state.dateErr}</span>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col l12">
              <input id="title" className={this.state.titleVal} type="text" ref="title"/>
              <label id="title-label" htmlFor="title">
                Title <span className="red-text">{this.state.titleErr}</span>
              </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col l6">
              <input id="hr" className={this.state.hrVal} type="number" ref="hr"/>
              <label id="hr-label" htmlFor="hr">
                Hours
              </label>
          </div>
          <div className="input-field col l6">
              <input id="min" className={this.state.minVal} type="number" ref="min"/>
              <label id="min-label" htmlFor="min">
                Minutes
              </label>
          </div>
        </div>
        <div className="row center">
          <button className="btn waves-effect waves-light" type="submit">
            Post <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    );
  }
}
