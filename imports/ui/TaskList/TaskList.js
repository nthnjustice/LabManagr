import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';

import {TaskLists} from '../../api/taskLists';

import User from './User/User';
import List from './List/List';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }
  componentDidMount() {
    this.listsTracker = Tracker.autorun(() => {
      Meteor.subscribe('taskLists');

      let lists = TaskLists.find({owner: Meteor.userId()}).fetch();
      this.setState({lists});
    });
  }
  componentWillUnmount() {
    this.listsTracker.stop();
  }
  checkLists() {
    if (this.state.lists.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  renderLists() {
    return this.state.lists.map((list) => {
      return <List key={list._id} id={list._id} title={list.title} color={this.props.color}/>;
    });
  }
  fetchLists(id) {
    this.setState({selectedUserId: id});

    let lists = TaskLists.find({owner: id}).fetch();
    this.setState({lists});
  }
  render() {
    return(
      <span id="task-list">
        <div className="row">
          <div className="col l4">
            <User color={this.props.color} onUserChange={this.fetchLists.bind(this)}/>
          </div>
          {
            this.checkLists()
              ? this.renderLists()
              : undefined
          }
        </div>
      </span>
    );
  }
};
