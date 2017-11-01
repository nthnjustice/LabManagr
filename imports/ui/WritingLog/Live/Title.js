import React from 'react';

export default class Title extends React.Component {
  render() {
    let infoText = "Use this section to launch a live writing session.";
    return(
      <div className={`row ${this.props.color}`}>
        <div className="col s9 m9 l9">
          <h5 className="white-text">Live Session</h5>
        </div>
        <div className="col s1 m1 l1 offset-s1 offset-m1 offset-l1">
          <i className="info-btn tooltipped material-icons white-text" data-position="bottom" data-delay="50" data-tooltip={infoText}>info</i>
        </div>
      </div>
    );
  }
}
