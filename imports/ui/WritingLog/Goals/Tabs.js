import React from 'react';

import Active from './Active/Active';
import NewGoal from './NewGoal';
import Achieved from './Achieved/Achieved';

export default class Tabs extends React.Component {
  componentDidMount() {
    $('#goals .tabs').tabs();
    setTimeout(function() {
      $('#goals .tab .active').trigger('click');
    }, 100);
  }
  render() {
    return(
      <span>
        <ul className="tabs tabs-fixed-width">
          <li className="tab col l4">
            <a className="active" href="#active">Active</a>
          </li>
          <li className="tab col l4">
            <a href="#new-goal">New</a>
          </li>
          <li className="tab col l4">
            <a href="#achieved">Achieved</a>
          </li>
        </ul>
        <Active/>
        <NewGoal/>
        <Achieved/>
      </span>
    );
  }
}
