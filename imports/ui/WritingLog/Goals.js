import React from 'react';

import ActiveGoals from './ActiveGoals';
import GoalsForm from './GoalsForm';
import AchievedGoals from './AchievedGoals';

export default class Live extends React.Component {
  componentDidMount() {
    $('#goals__tabs').tabs();

    setTimeout(function() {
      $('#goals__active-tab').trigger('click');
    }, 100);
  }
  render() {
    return(
      <div className="card large hoverable">

        <div id="goals__header" className="indigo darken-4">
          <h5 className="white-text">Goals</h5>
        </div>

        <div className="row">

          <ul id="goals__tabs" className="tabs tabs-fixed-width">
            <li className="tab col l4"><a id="goals__active-tab" className="active" href="#goals__active">Active</a></li>
            <li className="tab col l4"><a href="#goals__form">New</a></li>
            <li className="tab col l4"><a href="#goals__achieved">Achieved</a></li>
          </ul>

          <ActiveGoals/>
          <GoalsForm/>
          <AchievedGoals/>

      </div>

    </div>
    );
  }
}
