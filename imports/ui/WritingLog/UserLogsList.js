import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';

import {WritingGoals} from '../../api/writingGoals';

export default class UserLogsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currLog: ''
    };
  }
  componentDidMount() {
    $('#userLogs__del-modal').modal();
  }
  formatDate(date) {
    let str = date.toString();
    let arr = str.split(' ');
    return arr[0] + ', ' + arr[1] + ' ' + arr[2] + ', ' + arr[3];
  }
  renderLogs() {
    return this.props.selectedLogs.map((log) => {
      return (
        <li key={log._id} name={log.ownder} className="collection-item">

          <strong>{log.title}</strong>
          <br/>
          Duration: <strong>{log.hours}</strong> hour(s) and <strong>{log.minutes}</strong> minutes(s)
          <br/>
          Posted: <strong>{this.formatDate(log.createdAt)}</strong>
          {this.renderSecondaryContent(log)}

        </li>
      );
    });
  }
  renderSecondaryContent(log) {
    if (this.props.selectedUser == Meteor.userId()) {
      return (
        <a className="secondary-content">
          <i className="userLogs__delete-btn material-icons red-text text-lighten-3" onClick={() => {this.onDelete(log);}}>delete</i>
        </a>
      );
    }
  }
  onDelete(log) {
    this.setState({currLog: log});
    $('#userLogs__del-modal').modal('open');
  }
  confDelete() {
    Meteor.call('writingLogs.remove', this.state.currLog._id, (error, result) => {
      if (!error) {
        $('#userLogs__del-modal').modal('close');
        const $msg = $('<span class="green-text text-accent-3">Log Deleted</span>')
        Materialize.toast($msg, 5000, 'rounded');
      } else {
        const $msg = $('<span class="red-text">Error: Log Did Not Delete</span>')
        Materialize.toast($msg, 5000, 'rounded');
      }
    });
  }
  render() {
    return(
      <span>

        <ul className="collection">
          {this.renderLogs()}
        </ul>

        <div id="userLogs__del-modal" className="modal">
          <div className="modal-content">

            <p className="center-align">Delete goal?</p>

            <p id="userLogs__del-modal-text" className="center-align">{this.state.currLog.title}</p>

            <p className="center-align">
              <a className="userLogs__del-modal-btn grey lighten-4 red-text waves-effect btn-flat" onClick={() => {this.confDelete();}}>Delete</a>
              <a className="userLogs__del-modal-btn modal-action modal-close grey lighten-4 waves-effect btn-flat">Cancel</a>
            </p>

          </div>
        </div>

    </span>
    );
  }
}
