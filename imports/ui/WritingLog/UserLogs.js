import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';

import {WritingLogs} from '../../api/writingLogs';

export default class UserLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      currentPage: 1,
      logsPerPage: 3
    };
  }
  componentDidMount() {
    this.writingLogsTracker = Tracker.autorun(() => {
      Meteor.subscribe('writingLogs');
      const logs = WritingLogs.find().fetch();
      this.setState({logs});
    });
  }
  componentWillUnmount() {
    this.writingLogsTracker.stop();
  }
  renderPreloader() {
    return(
      <div className="spinner-layer spinner-red">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    );
  }
  formatDate(date) {
    let str = date.toString();
    let arr = str.split(' ');
    return arr[0] + ', ' + arr[1] + ' ' + arr[2] + ', ' + arr[3];
  }
  onDeleteLog(e) {
    e.preventDefault();
  }
  onPageClick(e) {
    e.preventDefault();

    this.setState({
      currentPage: Number(e.target.id)
    });
  }
  render() {
    const {logs, currentPage, logsPerPage} = this.state;

    const indexofLastLog = currentPage * logsPerPage;
    const indexofFirstLog = indexofLastLog - logsPerPage;
    const currentLogs = logs.slice(indexofFirstLog, indexofLastLog);

    const renderLogs = currentLogs.map((log, index) => {
      return(
        <li key={index} className="writing-log-item collection-item">
          <p className="truncate"><strong>{log.title}</strong></p>
          <p>Duration: <strong>{log.hours}</strong> hour(s) and <strong>{log.minutes}</strong> minutes(s)</p>
          <p>Posted: <strong>{this.formatDate(log.createdAt)}</strong></p>
          <a className="red-text align" onClick={this.onDeleteLog.bind(this)}>
            <em>Delete</em>
          </a>
        </li>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(logs.length / logsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <a key={number} id={number} onClick={this.onPageClick.bind(this)}>
          {number}
        </a>
      );
    });

    return (
      <div className="card-panel hoverable">
        <h5>Posted Writing Logs</h5>
        <div className="divider"></div>
        {
          this.state.logs
          ?
            <span>
              <ul className="collection">
                {renderLogs}
              </ul>
              <ul id="writing-log-page-numbers">
                {renderPageNumbers}
              </ul>
            </span>
          : this.renderPreloader()
        }

      </div>
    );
  }
};
