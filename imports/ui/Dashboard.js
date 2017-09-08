import React from 'react';

import SideNav from './SideNav';
import TopNav from './TopNav';
import BulletinBoard from './BulletinBoard/Temp';
import WritingLogWrapper from './WritingLog/WritingLogWrapper';

const modules = {
  'Bulletin Board': <BulletinBoard/>,
  'Writing Log': <WritingLogWrapper/>
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: modules['Writing Log'],
      moduleName: 'Writing Log'
    };
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
