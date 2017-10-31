import {Meteor} from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
      let options = users.map((user) => {
        let name = `${user.profile.firstName} ${user.profile.lastName}`;
        return <MenuItem key={user._id} insetChildren={true} value={user._id} primaryText={name}/>;
      });

      return options;
    } else {
      return false;
    }
  }
  handleSelectChange(event, index, value){
    this.setState({selectedUserId: value});
  }
  renderLogs() {
    let logs = WritingLogs.find({
      owner: this.state.selectedUserId
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();

    return <List selectedUserId={this.state.selectedUserId} logs={logs} pageCount={Math.ceil(logs.length / 4)}/>
  }
  render() {
    return (
      <span id="logs">
        <div className="card-panel hoverable">
          <Title color={this.props.color}/>
          <div className="wrapper">
            <MuiThemeProvider>
              <SelectField
                value={this.state.selectedUserId}
                onChange={this.handleSelectChange.bind(this)}
                className="select"
              >
                {this.renderUsers()}
              </SelectField>
            </MuiThemeProvider>
            <div className="col s12 m12 l12">
              {this.renderLogs()}
            </div>
          </div>
        </div>
      </span>
    );
  }
};
