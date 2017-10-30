import {Meteor} from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React from 'react';
import ReactDOM from 'react-dom';

import {WritingLogs} from '../../../api/writingLogs';

import Preloader from '../../Preloader/Preloader';
import Title from './Title';
import List from './List';

export default class Logs extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: Meteor.userId(),
      subscription: {
        users: Meteor.subscribe('directory'),
        logs: Meteor.subscribe('writingLogs')
      }
    };
  }
  componentDidMount() {
    $('#logs .select').material_select('destroy');
    $(ReactDOM.findDOMNode(this.refs.select)).change(this.handleSelectChange.bind(this));
  }
  componentWillUnmount() {
    this.state.subscription.users.stop();
    this.state.subscription.logs.stop();
  }
  renderUsers() {
    let currUser = Meteor.users.find({_id: Meteor.userId()}).fetch()[0];
    let users = [];

    if (currUser) {
      users = Meteor.users.find(
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
    }

    if (users.length > 0) {
      let sorted = [currUser];

      users.map((user) => {
        sorted.push(user);
      });

      users = sorted;
    }

    if (currUser && users.length > 0) {
      $('#logs .select').material_select('destroy');

      let options = users.map((user) => {
        let name = `${user.profile.firstName} ${user.profile.lastName}`;
        return <option key={user._id} value={name}>{name}</option>;
      });

      $('#logs .select').material_select();

      return options;
    } else {
      return false;
    }
  }
  handleSelectChange() {
    let nameArr = $('#logs .select-dropdown').val().split(' ');

    let selectedUserId = Meteor.users.find({
      $and: [
        {"profile.firstName": nameArr[0]},
        {"profile.lastName": nameArr[1]}
      ]
    }).fetch()[0]._id;

    this.setState({selectedUserId});
  }
  renderLogs() {
    let logs = WritingLogs.find({
      owner: this.state.selectedUserId
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();

    return <List selectedUserId={this.state.selectedUserId} logs={logs} pageCount={Math.ceil(logs.length / 3)}/>
  }
  render() {
    return (
      <span id="logs">
        <div className="card-panel hoverable">
          <Title color={this.props.color}/>
          <div className="wrapper">
            <div className="input-field col s12 m12 l12">
              <select className="select" ref="select">
                {this.renderUsers()}
              </select>
            </div>
            {this.renderLogs()}
          </div>
        </div>
      </span>
    );
  }
};
