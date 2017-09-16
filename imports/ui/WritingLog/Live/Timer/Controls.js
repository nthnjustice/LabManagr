import React from 'react';

export default class Controls extends React.Component {
  render() {
    return(
      <span>
        <div className="input-wrapper inline input-field ">
          <input id="input" type="number" ref="min"/>
          <label id="input-label" htmlFor="input">
            Minutes <span className="red-text">*</span>
          </label>
        </div>
        <div id="btn-wrapper" className="inline">
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
        <form className="checkbox-wrapper inline">
          <input id="sounds" type="checkbox" ref="sounds"/>
          <label htmlFor="sounds">Sounds</label>
        </form>
      </span>
    );
  }
}
