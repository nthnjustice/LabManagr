import {Tracker} from 'meteor/tracker';
import React from 'react';
import {Chart} from 'react-google-charts';
import ReactDOM from 'react-dom';

import Title from './Title';

import {WritingLogs} from '../../../api/writingLogs';

export default class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: '',
      users: [],
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
    this.weeklyTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingLogs');

      $('#weekly .select').material_select('destroy');

      const currUser = Meteor.users.find({
        _id: Meteor.userId()
      }).fetch();

      this.setState({selectedUserId: Meteor.userId()});

      const users = Meteor.users.find({
        _id: {
          $ne: Meteor.userId()
        }
      }, {
        sort: {
          "profile.firstName": 1
        }
      }
      ).fetch();

      let sortedUsers = [currUser[0]];
      for (let i = 0; i < users.length; i++) {
        sortedUsers.push(users[i]);
      }

      this.setState({users: sortedUsers});

      const today = new Date();
      let weekAgo = new Date();
      weekAgo.setUTCDate(weekAgo.getDate() - 7);

      const selectedLogs = WritingLogs.find(
        {
          $and: [
            {owner: this.state.selectedUserId},
            {
              createdAt: {
                $gte: weekAgo,
                $lt: today
              }
            }
          ]
        }, {
          sort: {
            createdAt: 1
          }
        }
      ).fetch();

      this.prepData(selectedLogs);

      if (currUser.length >= 1 && this.state.users.length > 1) {
        $('#weekly .select').val(`${currUser[0].profile.firstName} ${currUser[0].profile.lastName}`);
        $('#weekly .select').material_select();
        $(ReactDOM.findDOMNode(this.refs.select)).change(this.handleSelectChange.bind(this));
      }
    });
  }
  componentWillUnmount() {
    this.weeklyTracker.stop();
  }
  renderUsers() {
    if (this.state.users.length > 1) {
      let renderedUsers = '';

      renderedUsers = this.state.users.map((user) => {
        const name = `${user.profile.firstName} ${user.profile.lastName}`;
        return(
          <option key={user._id}>{name}</option>
        );
      });

      return renderedUsers;
    }
  }
  handleSelectChange(e) {
    const fullName = e.target.value;

    const nameArr = fullName.split(' ');

    const user = Meteor.users.find({
      $and: [
        {"profile.firstName": nameArr[0]},
        {"profile.lastName": nameArr[1]}
      ]
    }).fetch()[0];

    this.setState({selectedUserId: user._id});

    const today = new Date();
    let weekAgo = new Date();
    weekAgo.setUTCDate(weekAgo.getDate() - 7);

    const selectedLogs = WritingLogs.find(
      {
        $and: [
          {owner: this.state.selectedUserId},
          {
            createdAt: {
              $gte: weekAgo,
              $lt: today
            }
          }
        ]
      }, {
        sort: {
          createdAt: 1
        }
      }
    ).fetch();

    this.prepData(selectedLogs);
  }
  prepData(selectedLogs) {
    let hAxis = this.setHaxis();
    const vAxis = this.setVaxis(selectedLogs, hAxis);

    hAxis = this.numToDay(hAxis);

    let data = [['Day', 'Minutes', {role: 'style'}]];

    for (let i = 0; i < 6; i++) {
      data.push([hAxis[i], vAxis[i], '#4fc3f7']);
    }

    data.push([hAxis[6], vAxis[6], '#01579b']);

    this.setState({data});
  }
  setHaxis() {
    const today = new Date();
    const todayNum = today.getDay();
    const dayNums = [0, 1, 2, 3, 4, 5, 6];
    const todayIndex = dayNums.indexOf(todayNum);
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
    const converted = hAxisNums.map((i) => {
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
      <span id="weekly">
        <div className="card large hoverable">
          <Title/>
          <div className="row">
            <div className="input-field col l12">
              <select className="select" ref="select">
                {this.renderUsers()}
              </select>
            </div>
          </div>
          <div className="row">
            {
              this.state.data ?
                <Chart
                  chartType="ColumnChart"
                  data={this.state.data}
                  options={this.state.options}
                  graph_id="ScatterChart"
                  width="100%"
                  height="305px"
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
