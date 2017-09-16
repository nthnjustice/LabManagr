import {Meteor} from 'meteor/meteor';
import React from 'react';

import SideNav from '../SideNav/SideNav';
import TopNav from '../TopNav/TopNav';
import BulletinBoard from '../BulletinBoard/BulletinBoard';
import WritingLog from '../WritingLog/WritingLog';

const modules = {
  'Bulletin Board': <BulletinBoard/>,
  'Writing Log': <WritingLog/>
};

const colors = {
  'Bulletin Board': 'blue',
  'Writing Log': 'indigo darken-4'
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
  loadModule(name) {
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
        <SideNav onSelectModule={this.loadModule.bind(this)}/>
        <div id="dashboard">
          {this.state.module}
        </div>
      </span>
    );
  }
};
