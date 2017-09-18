import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import {WritingLogs} from '../../../api/writingLogs';

import Title from './Title';
import List from './List';

export default class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: '',
      users: [],
      selectedLogs: []
    };
  }
  componentDidMount() {
    this.logsTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingLogs');

      $('#logs .select').material_select('destroy');

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

      const selectedLogs = WritingLogs.find({
        owner: this.state.selectedUserId
      }, {
        sort: {
          createdAt: -1
        }
      }).fetch();

      this.setState({selectedLogs});

      if (currUser.length >= 1 && this.state.users.length > 1) {
        $('#logs .select').val(`${currUser[0].profile.firstName} ${currUser[0].profile.lastName}`);
        $('#logs .select').material_select();
        $(ReactDOM.findDOMNode(this.refs.select)).change(this.handleSelectChange.bind(this));
      }
    });
  }
  componentWillUnmount() {
    this.logsTracker.stop();
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

    const selectedLogs = WritingLogs.find({
      owner: this.state.selectedUserId
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();

    this.setState({selectedLogs});
  }
  render() {
    return (
      <span id="logs">
        <div className="card large hoverable">
          <Title/>
          <div className="wrapper">
            <div className="input-field col l12">
              <select className="select" ref="select">
                {this.renderUsers()}
              </select>
            </div>
            <List selectedUserId={this.state.selectedUserId} selectedLogs={this.state.selectedLogs}/>
          </div>
        </div>
      </span>
    );
  }
};
