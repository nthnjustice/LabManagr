import React from 'react';

import Log from './Log/Log';
import Live from './Live/Live';
import Goals from './Goals/Goals';
import Logs from './Logs/Logs';
import Charts from './Charts/Charts';
import Report from './Report/Report';
import Group from './Group/Group';

export default class WritingLogSmall extends React.Component {
  render() {
    return(
      <div className="hide-on-large-only hide-on-med-only">
        <div className="col l12">
          <Log color={this.props.color}/>
        </div>
        <div className="col l12">
          <Live color={this.props.color}/>
        </div>
        {/* <div className="col l12">
          <Goals color={this.props.color}/>
        </div> */}
        <div className="col l12">
          <Logs color={this.props.color}/>
        </div>
        {/* <div className="col l12">
          <Charts color={this.props.color}/>
        </div>
        <div className="col l12">
          <Report color={this.props.color}/>
        </div>
        <div className="col l12">
          <Group color={this.props.color}/>
        </div> */}
      </div>
    );
  }
}
