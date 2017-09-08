import React from 'react';

export default class Live extends React.Component {
  componentDidMount() {
    $('#collapsible-goals').collapsible();
  }
  render() {
    return(
      <div className="card-panel hoverable">
        <h5>Writing Goals</h5>
        <div className="divider"></div>

        <ul  id="collapsible-goals" className="collapsible" data-collapsible="expandable">

          <li>
            <div className="collapsible-header">
              <i className="material-icons">access_time</i> Active Goals
            </div>
            <div className="collapsible-body">
              <span>active goals here</span>
            </div>
          </li>

          <li>
            <div className="collapsible-header">
              <i className="material-icons">add_circle_outline</i> Set New Goal
            </div>
            <div className="collapsible-body">
              <span>new goals here</span>
            </div>
          </li>

          <li>
            <div className="collapsible-header">
              <i className="material-icons">done_all</i> Achieved Goals
            </div>
            <div className="collapsible-body">
              <span>achieved goals here</span>
            </div>
          </li>

        </ul>

      </div>
    );
  }
}
