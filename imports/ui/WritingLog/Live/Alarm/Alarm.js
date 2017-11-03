import React from 'react';

import Controls from './Controls';

export default class Alarm extends React.Component {
  render() {
    return(
      <span id="alarm">
        <div className="section container">
          <Controls/>
        </div>
      </span>
    );
  }
}
