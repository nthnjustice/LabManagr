import React from 'react';

import Title from './Title';
import Container from './Container';
// import Weekly from './Weekly';
// import Total from './Total';

export default class Charts extends React.Component {

  render() {
    return(
      <span id="charts">
        <div className="card large hoverable">
          <Title/>
          <Container/>
          {/* <Weekly/> */}
          {/* <Total/> */}
        </div>
      </span>
    );
  }
}
