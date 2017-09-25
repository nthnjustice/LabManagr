import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import {WritingGoals} from '../../../../api/writingGoals';

import Preloader from '../../../Preloader/Preloader';
import List from './List';

export default class Active extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: '',
      users: [],
      goals: []
    };
  }
  componentDidMount() {
    this.activeTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');
      Meteor.subscribe('writingGoals');

      $('#active #goals .select').material_select('destroy');

      this.setState({selectedUserId: Meteor.userId()});

      this.setUsersState();

      this.setGoalsState();

      let currUser = this.getCurrUser();

      if (currUser && this.state.users.length > 0) {
        $('#active #goals .select').val(`${currUser.profile.firstName} ${currUser.profile.lastName}`);
        $('#active #goals .select').material_select();
        $(ReactDOM.findDOMNode(this.refs.select)).change(this.handleSelectChange.bind(this));
      }
    });
  }
  componentWillUnmount() {
    this.activeTracker.stop();
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
  setGoalsState() {
    let goals = WritingGoals.find({
      owner: this.state.selectedUserId,
      active: true
    }, {
      sort: {
        deadline: 1
      }
    }).fetch();

    this.setState({goals});
  }
  renderUsers() {
    if (this.state.users.length > 1) {
      return this.state.users.map((user) => {
        let name = `${user.profile.firstName} ${user.profile.lastName}`;
        return <option key={user._id}>{name}</option>;
      });
    } else {
      return false;
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
    this.setGoalsState();
  }
  render() {
    return(
      <span id="active">
        <div id="goals">
          <div className="input-field col l12">
            <select className="select" ref="select">
              {this.renderUsers()}
            </select>
          </div>
          {
            this.state.goals
              ? <List selectedUserId={this.state.selectedUserId} goals={this.state.goals}/>
              : <Preloader/>
          }
        </div>
      </span>
    );
  }
}
