import {Meteor} from 'meteor/meteor';
import React from 'react';

import {WritingLogs} from '../../../api/writingLogs';

import {formatDate, formatMonth} from './helpers';

import Modal from './Modal';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      startErr: '*',
      startVal: '',
      endErr: '*',
      endVal: '',
      logs: [],
      start: '',
      end: ''
    };
  }
  componentDidMount() {
    Meteor.subscribe('writingLogs');
    $('#report #start').pickadate({closeOnSelect: true});
    $('#report #end').pickadate({closeOnSelect: true});
    $('#report .modal').modal();
  }
  validateStart(start) {
    if (!start) {
      this.setState({startErr: "* can't be blank", startVal: 'datepicker invalid'});
      return false;
    } else {
      this.setState({startErr: '*', startVal: 'datepicker valid'});
      return true;
    }
  }
  validateEnd(end) {
    if (!end) {
      this.setState({endErr: "* can't be blank", endVal: 'datepicker invalid'});
      return false;
    } else {
      this.setState({endErr: '*', endVal: 'datepicker valid'});
      return true;
    }
  }
  validateDates(start, end) {
    if (end - start < 0) {
      this.setState({error: 'invalid time-frame', startVal: 'invalid', endVal: 'invalid'});
      return false;
    } else {
      return true;
    }
  }
  resetForm() {
    $('#report #start').val(undefined);
    $('#report #start-label').removeClass('active');
    $('#report #end').val(undefined);
    $('#report #end-label').removeClass('active');
  }
  fetchLogs(startDate, endDate) {
    let logs = WritingLogs.find(
      {
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      }
    ).fetch();

    this.setState({logs});
  }
  onSubmit(e) {
    e.preventDefault();

    let start = this.refs.start.value.trim();
    let end = this.refs.end.value.trim();

    this.setState({start: start, end: end});

    let startVal = this.validateStart(start);
    let endVal = this.validateEnd(end);

    let startDate = '';
    let endDate = '';
    let datesVal = false;

    if (startVal && endVal) {
      startDate = formatDate(start);
      endDate = formatDate(end);
      datesVal = this.validateDates(startDate, endDate);
    }

    if (datesVal) {
      this.fetchLogs(startDate, endDate);

      $('#report .modal').modal('open');

      this.setState(
        {
        error: '',
        startErr: '*',
        startVal: '',
        endErr: '*',
        endVal: ''
        }
      );

      this.resetForm();
    }
  }
  render() {
    return(
      <span>
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <div className="row red lighten-5">
            {
              this.state.error
                ? <p className="error center-align red-text text-darken-4">{this.state.error}</p>
                : undefined
            }
          </div>
          <div className="input-field col l12">
            <input id="start" className={`datepicker ${this.state.startVal}`} type="text" ref="start"/>
            <label id="start-label" htmlFor="start">
              From <span className="red-text">{this.state.startErr}</span>
            </label>
          </div>
          <div className="input-field col l12">
            <input id="end" className={`datepicker ${this.state.endVal}`} type="text" ref="end"/>
            <label id="end-label" htmlFor="end">
              To <span className="red-text">{this.state.endErr}</span>
            </label>
          </div>
          <div className="row center">
            <button className="btn waves-effect waves-light" type="submit">
              Generate <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
        <Modal logs={this.state.logs} start={this.state.start} end={this.state.end}/>
      </span>
    );
  }
}
