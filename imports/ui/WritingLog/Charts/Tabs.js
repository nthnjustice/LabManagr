import React from 'react';

import Weekly from './Weekly/Weekly';
import Total from './Total/Total';

export default class Tabs extends React.Component {
  componentDidMount() {
    $('#charts .tabs').tabs();

    setTimeout(function() {
      $('#charts .tab .active').trigger('click');
    }, 100);
  }
  render() {
    return(
      <span>
        <ul className="tabs tabs-fixed-width">
          <li className="tab col l4">
            <a className="active" href="#weekly">Active</a>
          </li>
          <li className="tab col l4">
            <a href="#total">New</a>
          </li>
        </ul>
        <Weekly/>
        <Total/>
      </span>
    );
  }
}
