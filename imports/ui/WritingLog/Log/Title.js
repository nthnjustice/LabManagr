import React from 'react';

export default class Title extends React.Component {
  render() {
    return(
      <div className={`title row ${this.props.color}`}>
        <div className="col s12 m12 l12">
          <h5 className="white-text">Log Session</h5>
        </div>
      </div>
    );
  }
}
