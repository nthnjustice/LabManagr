import React from 'react';

import Title from './Title';
import Form from './Form';

export default class Report extends React.Component {
  render() {
    return(
      <span id="report">
        <div className="card large hoverable">
          <Title color={this.props.color}/>
          <div className="container valign-wrapper">
           <Form/>
          </div>
        </div>
      </span>
    );
  }
}
