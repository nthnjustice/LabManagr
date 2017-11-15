import {Meteor} from 'meteor/meteor';
import React from 'react';

import SideNav from '../SideNav/SideNav';
import TopNav from '../TopNav/TopNav';
import TaskList from '../TaskList/TaskList';
import WritingLog from '../WritingLog/WritingLog';

let colors = {
  'Task List': 'red darken-1',
  'Writing Log': 'deep-purple darken-4'
};

let modules = {
  'Task List': <TaskList color={colors['Task List']}/>,
  'Writing Log': <WritingLog color={colors['Writing Log']}/>
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      module: modules['Writing Log'],
      moduleName: 'Writing Log',
      color: colors['Writing Log']
    };
  }
  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.replace('/');
    }
  }
  handleModuleChange(name) {
    this.setState({
      moduleName: name,
      module: modules[name],
      color: colors[name]
    });
  }
  render() {
    return(
      <span>
        <TopNav title={this.state.moduleName} color={this.state.color}/>
        <SideNav handleModuleChange={this.handleModuleChange.bind(this)}/>
        <div id="dashboard">
          {this.state.module}
        </div>
      </span>
    );
  }
};
