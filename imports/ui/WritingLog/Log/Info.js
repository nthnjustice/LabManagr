import React from 'react';

export default class Info extends React.Component {
  componentDidMount() {
    $('#log .info-btn').tooltip({delay: 50});
  }
  render() {
    let infoText = "Use this form to log a writing session completed outside of the app.";

    return(
      <div className="info-wrapper row">
        <div className="col s12 m12 l12">
          <i className="info-btn tooltipped material-icons"
            data-position="bottom" data-delay="50"
            data-tooltip={infoText}
          >
            info_outline
          </i>
        </div>
      </div>
    );
  }
}
