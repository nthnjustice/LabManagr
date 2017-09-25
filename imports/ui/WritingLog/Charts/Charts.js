import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import {Chart} from 'react-google-charts';
import ReactDOM from 'react-dom';

import {WritingLogs} from '../../../api/writingLogs';

import Preloader from '../../Preloader/Preloader';
import Title from './Title';
import Week from './Week';
import Total from './Total';

export default class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: '',
      users: [],
      weekData: '',
      totalData: ''
    };
  }
  componentDidMount() {
    this.chartsTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingLogs');

      $('#charts .wrapper .select').material_select('destroy');

      this.setState({selectedUserId: Meteor.userId()});

      this.setUsersState();

      this.setWeekDataState();

      this.setTotalDataState();

      let currUser = this.getCurrUser();

      if (currUser && this.state.users.length > 0) {
        $('#charts .wrapper .select').val(`${currUser.profile.firstName} ${currUser.profile.lastName}`);
        $('#charts .wrapper .select').material_select();
        $(ReactDOM.findDOMNode(this.refs.select)).change(this.handleSelectChange.bind(this));
      }
    });
  }
  componentWillUnmount() {
    this.chartsTracker.stop();
  }
  getCurrUser() {
    return Meteor.users.find({_id: Meteor.userId()}).fetch()[0];
  }
  setUsersState() {
    let users = Meteor.users.find(
      {
        _id: {
          $ne: Meteor.userId()
        }
      }, {
        sort: {
          "profile.firstName": 1
        }
      }
    ).fetch();

    let sorted = [this.getCurrUser()];
    for (let i = 0; i < users.length; i++) {
      sorted.push(users[i]);
    }

    this.setState({users: sorted});
  }
  setWeekDataState() {
    let today = new Date();
    let weekAgo = new Date();
    weekAgo.setUTCDate(weekAgo.getDate() - 7);

    let selectedWeekLogs = WritingLogs.find(
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

    this.prepWeekData(selectedWeekLogs);
  }
  setTotalDataState() {
    let selectedTotalLogs = WritingLogs.find(
      {
        owner: this.state.selectedUserId
      }, {
        sort: {
          createdAt: 1
        }
      }
    ).fetch();

    this.prepTotalData(selectedTotalLogs);
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
  getUser(name) {
    let nameArr = name.split(' ');

    let user = Meteor.users.find({
      $and: [
        {"profile.firstName": nameArr[0]},
        {"profile.lastName": nameArr[1]}
      ]
    }).fetch()[0];

    this.setState({selectedUserId: user._id})
  }
  handleSelectChange(e) {
    let name = e.target.value;
    this.getUser(name);
    this.setWeekDataState();
    this.setTotalDataState();
  }
  prepWeekData(selectedWeekLogs) {
    let hAxis = this.setWeekHaxis();
    let vAxis = this.setWeekVaxis(selectedWeekLogs, hAxis);

    hAxis = this.numToDay(hAxis);

    let data = [['Day', 'Minutes', {role: 'style'}]];

    for (let i = 0; i < 6; i++) {
      data.push([hAxis[i], vAxis[i], '#4fc3f7']);
    }

    data.push([hAxis[6], vAxis[6], '#01579b']);

    this.setState({weekData: data});
  }
  setWeekHaxis() {
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
  setWeekVaxis(selectedWeekLogs, hAxis) {
    let hours = 0;
    let minutes = 0;
    let times = [];

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < selectedWeekLogs.length; j++) {
        if (selectedWeekLogs[j].createdAt.getDay() == hAxis[i]) {
          hours = hours + selectedWeekLogs[j].hours;
          minutes = minutes + selectedWeekLogs[j].minutes;
        }
      }
      minutes = minutes + (hours * 60);
      times.push(minutes);
      hours = 0;
      minutes = 0;
    }

    return times;
  }
  prepTotalData(selectedTotalLogs) {
    if (selectedTotalLogs.length < 1) {
      selectedTotalLogs = [
        {
          hours: 0,
          minutes: 0,
          createdAt: new Date
        }
      ];
    }

    let hAxis = this.setTotalHaxis(selectedTotalLogs);
    let vAxis = this.setTotalVaxis(selectedTotalLogs, hAxis);

    let data = [['Day', 'Minutes']];

    for (let i = 0; i < selectedTotalLogs.length; i++) {
      data.push([hAxis[i], vAxis[i]]);
    }

    this.setState({totalData: data});
  }
  setTotalHaxis(selectedTotalLogs) {
    let allDates = selectedTotalLogs.map((log) => {
      let month = log.createdAt.getMonth() + 1;
      let day = log.createdAt.getDate();
      let year = log.createdAt.getFullYear();

      return `${month}/${day}/${year}`;
    });

    let filteredDates = (arrArg) => {
      return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
      });
    }

    return filteredDates(allDates);
  }
  setTotalVaxis(selectedTotalLogs, hAxis) {
    let hours = 0;
    let minutes = 0;
    let times = [];

    for (let i = 0; i < hAxis.length; i++) {
      for (let j = 0; j < selectedTotalLogs.length; j++) {
        let month = selectedTotalLogs[j].createdAt.getMonth() + 1;
        let day = selectedTotalLogs[j].createdAt.getDate();
        let year = selectedTotalLogs[j].createdAt.getFullYear();
        let date = `${month}/${day}/${year}`;

        if (hAxis[i] == date) {
          hours = hours + selectedTotalLogs[j].hours;
          minutes = minutes + selectedTotalLogs[j].minutes;
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
      <span id="charts">
        <div className="card large hoverable">
          <Title color={this.props.color}/>
          <div className="wrapper row">
            <div className="input-field col l12">
              <select className="select" ref="select">
                {this.renderUsers()}
              </select>
            </div>
          </div>
          <div className="row">
            {
              this.state.weekData
                ? <Week data={this.state.weekData}/>
                : <Preloader/>
            }
          </div>
          <div className="row">
            {
              this.state.totalData
                ? <Total data={this.state.totalData}/>
                : <Preloader/>
            }
          </div>
        </div>
      </span>
    );
  }
}
