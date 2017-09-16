import React from 'react';

export default class Controls extends React.Component {
  render() {
    return(
      <div className="btn-wrapper">
        <a id="start" className="btn-icon waves-effect">
          <i className="material-icons small">play_arrow</i>
        </a>
        <a id="pause" className="btn-icon waves-effect">
          <i className="material-icons small">pause</i>
        </a>
        <a id="reset" className="btn-icon waves-effect">
          <i className="material-icons small">loop</i>
        </a>
      </div>
    );
  }
}
