import React from 'react';

export default class Title extends React.Component {
  componentDidMount() {
    $('#log .info-btn').tooltip({delay: 50});
  }
  render() {
    return(
      <div className={`row ${this.props.color}`}>
        <div className="col l9">
          <h5 className="white-text">Log Session</h5>
        </div>
        <div className="col l1 offset-l1">
          <i className="info-btn tooltipped material-icons white-text" datat-position="bottom" data-delay="50" data-tooltip="hi">info</i>
        </div>
      </div>
    );
  }
}
