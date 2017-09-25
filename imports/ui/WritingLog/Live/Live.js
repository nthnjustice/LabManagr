import React from 'react';

import Title from './Title';
import Tabs from './Tabs';

export default class Live extends React.Component {
  render() {
    return(
      <span id="live">
        <div className="card large hoverable">
          <Title color={this.props.color}/>
          <Tabs/>
        </div>
      </span>
    );
  }
}
