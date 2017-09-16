import React from 'react';

import Title from './Title';
import Tabs from './Tabs';

export default class Goals extends React.Component {

  render() {
    return(
      <span id="goals">
        <div className="card large hoverable">
          <Title/>
          <div className="row">
            <Tabs/>
          </div>
        </div>
      </span>
    );
  }
}
