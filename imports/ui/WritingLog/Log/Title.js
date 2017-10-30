import React from 'react';

export default class Title extends React.Component {
  componentDidMount() {
    $('#log .info-btn').tooltip({delay: 50});
  }
  render() {
    let infoText = "Use this form to log a writing session done outside of the app.";
    return(
      <div className={`row ${this.props.color}`}>
        <div className="col s9 m9 l9">
          <h5 className="white-text">Log Session</h5>
        </div>
        <div className="col s1 m1 l1 offset-s1 offset-m1 offset-l1">
          <i className="info-btn tooltipped material-icons white-text" data-position="bottom" data-delay="50" data-tooltip={infoText}>info</i>
        </div>
      </div>
    );
  }
}
