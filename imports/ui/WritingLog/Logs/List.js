import {Meteor} from 'meteor/meteor';
import React from 'react';

import {WritingLogs} from '../../../api/writingLogs';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currLog: ''
    };
  }
  componentDidMount() {
    $('#logs .modal').modal();
  }
  formatDate(date) {
    const str = date.toString();
    const arr = str.split(' ');
    return `${arr[0]}, ${arr[1]} ${arr[2]}, ${arr[3]}`;
  }
  renderLogs() {
    return this.props.selectedLogs.map((log) => {
      return (
        <li key={log._id} className="collection-item">
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
    if (this.props.selectedUserId == Meteor.userId()) {
      return (
        <a className="secondary-content">
          <i className="delete-btn material-icons red-text text-lighten-3" onClick={() => {this.onDelete(log);}}>delete</i>
        </a>
      );
    }
  }
  onDelete(log) {
    this.setState({currLog: log});
    $('#logs .modal').modal('open');
  }
  confDelete() {
    Meteor.call('writingLogs.remove', this.state.currLog._id, (err) => {
      if (!err) {
        $('#logs .modal').modal('close');

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
        <div className="modal">
          <div className="modal-content">
            <p className="center-align">Delete goal?</p>
            <p className="text center-align">{this.state.currLog.title}</p>
            <p className="center-align">
              <a className="modal-btn btn-flat grey lighten-4 red-text waves-effect" onClick={() => {this.confDelete();}}>Delete</a>
              <a className="modal-btn btn-flat modal-action modal-close grey lighten-4 waves-effect">Cancel</a>
            </p>
          </div>
        </div>
    </span>
    );
  }
}
