import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import Title from './Title';
import Form from './Form';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: '',
      users: []
    };
  }
  componentDidMount() {
    this.usersTracker = Tracker.autorun(() => {
      Meteor.subscribe('directory');

      $('#task-list #user .select').material_select('destroy');

      this.setState({selectedUserId: Meteor.userId()});

      this.setUsersState();

      let currUser = this.getCurrUser();

      if (currUser && this.state.users.length > 0) {
        $('#task-list #user .select').val(`${currUser.profile.firstName} ${currUser.profile.lastName}`);
        $('#task-list #user .select').material_select();
        $(ReactDOM.findDOMNode(this.refs.select)).change(this.handleSelectChange.bind(this));
      }
    });
  }
  componentWillUnmount() {
    this.usersTracker.stop();
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
    this.props.onUserChange(this.state.selectedUserId);
  }
  render() {
    return(
      <span id="user">
        <div className="card large hoverable">
          <Title color={this.props.color}/>
          <div className="container">
              <div className="input-field col l12">
                <select className="select" ref="select">
                  {this.renderUsers()}
                </select>
              </div>
            <div className="row">
              <Form selectedUserId={this.state.selectedUserId}/>
            </div>
          </div>
        </div>
      </span>
    );
  }
}
