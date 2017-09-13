import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import {WritingGoals} from '../../api/writingGoals';

import AchievedGoalsList from './AchievedGoalsList';

export default class AchievedGoals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: '',
      users: [],
      achievedGoals: []
    };
  }
  componentDidMount() {
    this.achievedGoalsTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingGoals');

      this.setState({selectedUser: Meteor.userId()})

      const users = Meteor.users.find().fetch();
      this.setState({users});

      const achievedGoals = WritingGoals.find({
        owner: this.state.selectedUser,
        active: false
      }, {
        sort: {
          deadline: 1
        }
      }).fetch();

      this.setState({achievedGoals});

      $('#achievedGoals__select').material_select();
      $(ReactDOM.findDOMNode(this.refs.select)).on('change', this.handleSelectChange.bind(this));
    });
  }
  componentWillUnmount() {
    this.achievedGoalsTracker.stop();
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

    const achievedGoals = WritingGoals.find({
      owner: this.state.selectedUser,
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
      <span>
        <div id="goals__achieved">

          <div className="input-field col l12">
            <select id="achievedGoals__select" ref="select">
              {this.renderUsers()}
            </select>
          </div>

          <AchievedGoalsList selectedUser={this.state.selectedUser} achievedGoals={this.state.achievedGoals}/>

        </div>
      </span>
    );
  }
}
