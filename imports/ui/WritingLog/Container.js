import React from 'react';

import Log from './Log/Log';
import Live from './Live/Live';
import Goals from './Goals/Goals';
import Logs from './Logs/Logs';
import Weekly from './Weekly/Weekly';

export default class Container extends React.Component {
  render() {
    return(
      <span>
        <div className="row">
          <div className="col l3">
            <Log/>
          </div>
          <div className="col l5">
            <Live/>
          </div>
          <div className="col l4">
            <Goals/>
          </div>
        </div>
        <div className="row">
          <div className="col l4">
            <Logs/>
          </div>
          <div className="col l8">
            <Weekly/>
          </div>
        </div>
      </span>
    );
  }
}
