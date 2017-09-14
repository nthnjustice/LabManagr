import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import {WritingLogs} from '../../api/writingLogs';

import UserLogsList from './UserLogsList'

export default class UserLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: '',
      users: [],
      selectedLogs: []
    };
  }
  componentDidMount() {
    this.userLogsTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingLogs');

      const currUser = Meteor.users.find({
        _id: Meteor.userId()
      }).fetch();

      this.setState({selectedUser: Meteor.userId()})

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

      const sortedUsers = [currUser[0]];
      for (let i = 0; i < users.length; i++) {
        sortedUsers.push(users[i]);
      }

      this.setState({users: sortedUsers});

      const selectedLogs = WritingLogs.find({
        owner: this.state.selectedUser
      }, {
        sort: {
          createdAt: -1
        }
      }).fetch();

      this.setState({selectedLogs});

      if (currUser.length >= 1) {
        $('#userLogs__select').val(`${currUser[0].profile.firstName} ${currUser[0].profile.lastName}`);
      }

      $('#userLogs__select').material_select();
      $(ReactDOM.findDOMNode(this.refs.select)).on('change', this.handleSelectChange.bind(this));
    });
  }
  componentWillUnmount() {
    this.userLogsTracker.stop();
  }
  renderUsers() {
    if (this.state.users.length > 1) {
      let renderedUsers = '';

      renderedUsers = this.state.users.map((user) => {
        let name = `${user.profile.firstName} ${user.profile.lastName}`;
        return(
          <option key={user._id}>{name}</option>
        );
      });

      return renderedUsers;
    }
  }
  handleSelectChange(e) {
    let fullName = e.target.value;
    let nameArr = fullName.split(' ');

    const user = Meteor.users.find({
      $and: [
        {"profile.firstName": nameArr[0]},
        {"profile.lastName": nameArr[1]}
      ]
    }).fetch()[0];

    this.setState({selectedUser: user._id})

    const selectedLogs = WritingLogs.find({
      owner: this.state.selectedUser
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();

    this.setState({selectedLogs});
  }
  render() {
    return (
      <div id="userLogs">

        <div className="input-field col l12">
          <select id="userLogs__select" ref="select">
            {this.renderUsers()}
          </select>
        </div>

        <UserLogsList selectedUser={this.state.selectedUser} selectedLogs={this.state.selectedLogs}/>

      </div>
    );
  }
};
