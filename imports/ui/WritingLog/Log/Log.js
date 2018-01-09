import React from 'react';

import Title from './Title';
import Form from './Form';


export default class Log extends React.Component {
  render() {
    return(
      <span id="log">
        <div className="card-panel hoverable">
          <Title color={this.props.color}/>
          <div className="hide-on-large-only">
            <div className="container">
              <Form/>
            </div>
          </div>
          <div className="hide-on-med-and-down">
            <Form/>
          </div>
        </div>
      </span>
    );
  }
}
