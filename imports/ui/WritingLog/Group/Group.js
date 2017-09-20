import {Tracker} from 'meteor/tracker';
import React from 'react';
import {Chart} from 'react-google-charts';

import {WritingLogs} from '../../../api/writingLogs';

import Title from './Title';

export default class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      options: {
        title: 'Total',
        titlePosition: 'center',
        hAxis: {
          title: '',
          minValue: 0,
          maxValue: 7
        },
        vAxis: {
          title: 'Minutes',
          minValue: 0,
          maxValue: 120
        },
        isStacked: true
      },
      data: ''
    };
  }
  componentDidMount() {
    this.groupTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingLogs');

      const users = Meteor.users.find({},
        {
          sort: {
            "Profile.firstName": 1
          }
        }
      ).fetch();

      this.setState({users});

      const logs = WritingLogs.find({},
        {
          sort: {
            createdAt: 1
          }
        }
      ).fetch();

      this.prepData(logs);
    });
  }
  componentWillUnmount() {
    this.groupTracker.stop();
  }
  prepData(logs) {
    annotation = ['User'];

    let names = this.state.users.map((user) => {
      return `${user.profile.firstName} ${user.profile.lastName}`;
    });

    for (let i = 0; i < names.length; i++) {
      annotation.push(names[i]);
    }

    annotation.push({role: 'annotation'});

    const hAxis = this.setHaxis(logs);
    const vAxis = this.setVaxis(logs, hAxis);

    let data = [annotation];

    for (let i = 0; i < hAxis.length; i++) {
      let row = [hAxis[i]];
      for (let j = 0; j < vAxis[i].length; j++) {
        row.push(vAxis[i][j]);
      }
      row.push('');
      data.push(row);
    }

    this.setState({data});
  }
  setHaxis(logs) {
    let allDates = logs.map((log) => {
      const month = log.createdAt.getMonth() + 1;
      const day = log.createdAt.getDate();
      const year = log.createdAt.getFullYear();

      return `${month}/${day}/${year}`;
    });

    let filteredDates = (arrArg) => {
      return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
      });
    }

    return filteredDates(allDates);
  }
  setVaxis(logs, dates) {
    let data = dates.map((date) => {
      const dateSorted = logs.filter((log) => {
        let month = log.createdAt.getMonth() + 1;
        let day = log.createdAt.getDate();
        let year = log.createdAt.getFullYear();
        let logDate = `${month}/${day}/${year}`;
        return date == logDate;
      });

      const userSorted = this.state.users.map((user) => {
        let name = `${user.profile.firstName} ${user.profile.lastName}`;
        return dateSorted.filter((log) => {
          return name == log.author;
        });
      });

      return userSorted;
    });

    data = data.map((date) => {
      total = date.map((user) => {
        let time = 0;
        if (user.length == 0) {
          return 0;
        } else {
          for (let i = 0; i < user.length; i++) {
            time = time + (user[i].minutes + (user[i].hours * 60));
          }
          return time;
        }
      });
      return total;
    });

    return data;
  }
  render() {
    return(
      <span id="group">
        <div className="card large hoverable">
          <Title/>
          <div className="row">
            {
              this.state.data ?
                <Chart
                  chartType="ColumnChart"
                  data={this.state.data}
                  options={this.state.options}
                  width="100%"
                  height="425px"
                  legend_toggle
                />
              : undefined
            }
          </div>
        </div>
      </span>
    );
  }
}
