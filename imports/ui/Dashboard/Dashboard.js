import React from 'react';

import SideNav from '../SideNav/SideNav';
import TopNav from '../TopNav/TopNav';
import BulletinBoard from '../BulletinBoard/BulletinBoard';
import WritingLog from '../WritingLog/WritingLog';

const modules = {
  'Bulletin Board': <BulletinBoard/>,
  'Writing Log': <WritingLog/>
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: modules['Writing Log'],
      moduleName: 'Writing Log'
    };
  }
  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.replace('/');
    }
  }
  loadModule(name) {
    this.setState({moduleName: name});
    this.setState({module: modules[name]});
  }
  render() {
    return(
      <span>

        <TopNav title={this.state.moduleName}/>
        <SideNav onSelectModule={this.loadModule.bind(this)}/>

        <div id="dashboard">
          {this.state.module}
        </div>

      </span>
    );
  }
};
