import React from 'react';
import Fade from 'react-fade';

import WritingLogSmall from './WritingLogSmall';
import WritingLogMedium from './WritingLogMedium';
import WritingLogLarge from './WritingLogLarge';

export default class WritingLog extends React.Component {
  render() {
    return(
      <span id="writing-log">
        <Fade duration={0.5}>
          <WritingLogSmall color={this.props.color}/>
          <WritingLogMedium color={this.props.color}/>
          <WritingLogLarge color={this.props.color}/>          
        </Fade>
      </span>
    );
  }
}
