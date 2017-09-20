import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import {Chart} from 'react-google-charts';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.reportTracker = Tracker.autorun(() => {
      Meteor.subscribe('writingLogs');

      const users = Meteor.users.find({}).fetch();

      this.setState({users});
    })
  }
  componentWillUnmount() {
    this.reportTracker.stop();
  }
  logsLoaded() {
    if (this.props.logs) {
      return true;
    } else {
      return false;
    }
  }
  renderColumns() {
    return (
      [
        {type: 'string', label: 'Name'},
        {type: 'number', label: 'Count'},
        {type: 'number', label: 'Total Time'}
      ]
    );
  }
  getNames(users) {
    return users.map((user) => {
      return `${user.profile.firstName} ${user.profile.lastName}`;
    });
  }
  getCounts(users, logs) {
    const counts = users.map((user) => {
      const sorted = logs.filter((log) => {
        if (user._id == log.owner) {
          return log;
        }
      });
      return sorted.length;
    });

    return counts;
  }
  getTotals(users, logs) {
    let totals = users.map((user) => {
      const sorted = logs.filter((log) => {
        if (user._id == log.owner) {
          return log;
        }
      });

      const times = sorted.map((log) => {
        return log.minutes + (log.hours * 60);
      })

      return times;
    });

    let output = []

    for (let i = 0; i < totals.length; i++) {
      let time = 0;
      for (let j = 0; j < totals[i].length; j++) {
        time = time + totals[i][j];
      }
      output.push(time);
    }

    return output;
  }
  renderRows() {
    const users = this.state.users;
    const logs = this.props.logs;
    const names = this.getNames(users);
    const counts = this.getCounts(users, logs);
    const totals = this.getTotals(users, logs);

    let rows = [];

    for (let i = 0; i < users.length; i++) {
      let arr = [
        names[i],
        {v: counts[i], f: `${counts[i]} Log(s)`},
        {v: totals[i], f: `${totals[i]} Minute(s)`}
      ];
      rows.push(arr);
    }

    return rows;

    return (
      [
        ['Mike', {v: 10, f: '10 Logs'}, {v: 160, f: '160 Minutes'}]
      ]
    );
  }
  render() {
    return(
      <div className="modal modal-fixed-footer">
        <div className="modal-content">
          {
            this.logsLoaded() ?
              <span>
                <h4>{`${this.props.start} - ${this.props.end}`}</h4>
                <Chart
                  chartType="Table"
                  width="100%"
                  height="100%"
                  columns={this.renderColumns()}
                  rows={this.renderRows()}
                  chartPackages={["table"]}
                />
              </span>  
            : undefined
          }
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close btn-flat grey lighten-4 red-text waves-effect waves-red">
            Close
          </a>
        </div>
      </div>
    );
  }
}
