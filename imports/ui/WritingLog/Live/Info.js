import React from 'react';

export default class Info extends React.Component {
  componentDidMount() {
    $('#log .info-btn').tooltip({delay: 50});
  }
  render() {
    let infoText = "Use this section to launch a live writing session.";

    return(
      <div className="info-wrapper">
        <i className="info-btn tooltipped material-icons white-text"
          data-position="bottom" data-delay="50"
          data-tooltip={infoText}
          >
            info_outline
          </i>
        </div>
    );
  }
}
