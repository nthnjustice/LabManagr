import React from 'react';

import Title from './Title';

export default class List extends React.Component {
  render() {
    return (
      <span id="list">
        <div className="col l4">
          <div className="card large hoverable">
            <Title id={this.props.id} color={this.props.color} title={this.props.title}/>
          </div>
        </div>
      </span>
    );
  }
}
