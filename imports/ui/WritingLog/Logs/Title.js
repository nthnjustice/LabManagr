import React from 'react';

export default class Title extends React.Component {
  render() {
    return(
      <div className={`title ${this.props.color}`}>
        <h5 className="white-text">Posted</h5>
      </div>
    );
  }
}
