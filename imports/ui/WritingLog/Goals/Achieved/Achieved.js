import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import {WritingGoals} from '../../../../api/writingGoals';

import List from './List';

export default class Achieved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: '',
      users: [],
      achievedGoals: []
    };
  }
  componentDidMount() {
    this.achievedTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingGoals');

      $('#achieved #goals .select').material_select('destroy');

      const currUser = Meteor.users.find({
        _id: Meteor.userId()
      }).fetch();

      this.setState({selectedUserId: Meteor.userId()})

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

      const achievedGoals = WritingGoals.find({
        owner: this.state.selectedUserId,
        active: false
      }, {
        sort: {
          deadline: 1
        }
      }).fetch();

      this.setState({achievedGoals});

      if (currUser.length >= 1 && this.state.users.length > 1) {
        $('#achieved #goals .select').val(`${currUser[0].profile.firstName} ${currUser[0].profile.lastName}`);
        $('#achieved #goals .select').material_select();
        $(ReactDOM.findDOMNode(this.refs.select)).change(this.handleSelectChange.bind(this));
      }
    });
  }
  componentWillUnmount() {
    this.achievedTracker.stop();
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

    this.setState({selectedUserId: user._id})

    const achievedGoals = WritingGoals.find({
      owner: this.state.selectedUserId,
      active: false
    }, {
      sort: {
        deadline: 1
      }
    }).fetch();

    this.setState({achievedGoals});
  }
  render() {
    return(
      <span id="achieved">
        <div id="goals">
          <div className="input-field col l12">
            <select className="select" ref="select">
              {this.renderUsers()}
            </select>
          </div>
          <List selectedUserId={this.state.selectedUserId} achievedGoals={this.state.achievedGoals}/>
        </div>
      </span>
    );
  }
}
