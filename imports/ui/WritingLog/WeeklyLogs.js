import {Tracker} from 'meteor/tracker';
import React from 'react';
import {Chart} from 'react-google-charts';

import {WritingLogs} from '../../api/writingLogs';

export default class WeeklyLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: '',
        hAxis: {
          title: 'Day',
          minValue: 0,
          maxValue: 7
        },
        vAxis: {
          title: 'Minutes',
          minValue: 0,
          maxValue: 120
        },
        legend: 'none',
      },
      data: ''
    };
  }
  componentDidMount() {
    this.weeklyLogsTracker = Tracker.autorun(() => {
      Meteor.subscribe('writingLogs');

      let today = new Date();
      let weekAgo = new Date();
      weekAgo.setUTCDate(weekAgo.getDate() - 7);

      const logs = WritingLogs.find(
        {
          createdAt: {
            $gte: weekAgo,
            $lt: today
          }
        }, {
          sort: {
            createdAt: 1
          }
        }
      ).fetch();

      this.prepData(logs);
    });
  }
  componentWillUnmount() {
    this.weeklyLogsTracker.stop();
  }
  renderPreloader() {
    return(
      <h5>Loading...</h5>
    );
  }
  prepData(logs) {
    let hAxis = this.setHaxis(logs);
    let vAxis = this.setVaxis(logs, hAxis);

    hAxis = this.numToDay(hAxis);

    let data = [['Day', 'Minutes', {role: 'style'}]];

    for (let i = 0; i < 6; i++) {
      data.push([hAxis[i], vAxis[i], '#4fc3f7']);
    }

    data.push([hAxis[6], vAxis[6], '#01579b']);

    this.setState({data});
  }
  setHaxis(logs) {
    let today = new Date();
    let todayNum = today.getDay();
    let dayNums = [0, 1, 2, 3, 4, 5, 6];
    let todayIndex = dayNums.indexOf(todayNum);
    let hAxisNums = [];

    for (let i = todayIndex; i > -1; i--) {
      hAxisNums.push(dayNums[i]);
    }

    for (let i = todayIndex + 1; i < 7; i++) {
      hAxisNums.push(dayNums[i]);
    }

    hAxisNums = hAxisNums.reverse();

    return hAxisNums;
  }
  numToDay(hAxisNums) {
    let converted = hAxisNums.map((i) => {
      if (i == 0) {
        return 'Sun';
      } else if (i == 1) {
        return 'Mon';
      } else if (i == 2) {
        return 'Tues';
      } else if (i == 3) {
        return 'Wed';
      } else if (i == 4) {
        return 'Thurs';
      } else if (i == 5) {
        return 'Fri';
      } else {
        return 'Sat';
      }
    });

    return converted;
  }
  setVaxis(logs, hAxis) {
    let hours = 0;
    let minutes = 0;

    let times = [];

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < logs.length; j++) {
        if (logs[j].createdAt.getDay() == hAxis[i]) {
          hours = hours + logs[j].hours;
          minutes = minutes + logs[j].minutes;
        }
      }
      minutes = minutes + (hours * 60);
      times.push(minutes);
      hours = 0;
      minutes = 0;
    }

    return times;
  }
  render() {
    return(
      <div className="card-panel hoverable">
        <h5>Weekly Log Times</h5>
        <div className="divider"></div>
        {
          this.state.data ?
            <Chart
              chartType="ColumnChart"
              data={this.state.data}
              options={this.state.options}
              graph_id="ScatterChart"
              width="100%"
              height="400px"
              legend_toggle
            />
          : this.renderPreloader()
        }

      </div>
    );
  }
}
