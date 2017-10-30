import React from 'react';

import Log from './Log/Log';
import Live from './Live/Live';
import Goals from './Goals/Goals';
import Logs from './Logs/Logs';
import Charts from './Charts/Charts';
import Report from './Report/Report';
import Group from './Group/Group';

export default class WritingLog extends React.Component {
  render() {
    return(
      <span id="writing-log">
        <div className="hide-on-med-and-down">
          <div className="row">
            <div className="col l3">
              <Log color={this.props.color}/>
            </div>
            {/* <div className="col l5">
              <Live color={this.props.color}/>
            </div>
            <div className="col l4">
              <Goals color={this.props.color}/>
            </div> */}
          </div>
          <div className="row">
            <div className="col l4">
              <Logs color={this.props.color}/>
            </div>
            {/* <div className="col l8">
              <Charts color={this.props.color}/>
            </div> */}
          </div>
          <div className="row">
            {/* <div className="col l4">
              <Report color={this.props.color}/>
            </div>
            <div className="col l8">
              <Group color={this.props.color}/>
            </div> */}
          </div>
        </div>
        <div className="hide-on-large-only hide-on-small-only">
          <div className="row">
             <div className="col l3">
              <Log color={this.props.color}/>
            </div>
            {/* <div className="col l5">
              <Live color={this.props.color}/>
            </div>
            <div className="col l4">
              <Goals color={this.props.color}/>
            </div> */}
          </div>
          <div className="row">
            <div className="col l4">
              <Logs color={this.props.color}/>
            </div>
            {/* <div className="col l8">
              <Charts color={this.props.color}/>
            </div> */}
          </div>
          <div className="row">
            {/* <div className="col l4">
              <Report color={this.props.color}/>
            </div>
            <div className="col l8">
              <Group color={this.props.color}/>
            </div> */}
          </div>
        </div>
        <div className="hide-on-large-only hide-on-med-only">
          <div className="col l12">
            <Log color={this.props.color}/>
          </div>
          {/* <div className="col l12">
            <Live color={this.props.color}/>
          </div>
          <div className="col l12">
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
      </span>
    );
  }
}
