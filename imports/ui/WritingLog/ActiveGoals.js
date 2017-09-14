import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import {WritingGoals} from '../../api/writingGoals';

import ActiveGoalsList from './ActiveGoalsList';

export default class ActiveGoals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: '',
      users: [],
      activeGoals: []
    };
  }
  componentDidMount() {
    this.activeGoalsTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingGoals');

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

      const activeGoals = WritingGoals.find({
        owner: this.state.selectedUser,
        active: true
      }, {
        sort: {
          deadline: 1
        }
      }).fetch();

      this.setState({activeGoals});

      if (currUser.length >= 1) {
        $('#activeGoals__select').val(`${currUser[0].profile.firstName} ${currUser[0].profile.lastName}`);
      }
      
      $('#activeGoals__select').material_select();
      $(ReactDOM.findDOMNode(this.refs.select)).on('change', this.handleSelectChange.bind(this));
    });
  }
  componentWillUnmount() {
    this.activeGoalsTracker.stop();
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

    const activeGoals = WritingGoals.find({
      owner: this.state.selectedUser,
      active: true
    }, {
      sort: {
        deadline: 1
      }
    }).fetch();

    this.setState({activeGoals});
  }
  render() {
    return(
      <span>
        <div id="goals__active">

          <div className="input-field col l12">
            <select id="activeGoals__select" ref="select">
              {this.renderUsers()}
            </select>
          </div>

          <ActiveGoalsList selectedUser={this.state.selectedUser} activeGoals={this.state.activeGoals}/>

        </div>
      </span>
    );
  }
}
