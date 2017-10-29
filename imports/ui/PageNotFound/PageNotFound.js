import React from 'react';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
import Title from './Title';
import Body from './Body';

export default class PageNotFound extends React.Component {
  render() {
    return(
      <span id="PageNotFound">
        <VerticalAlign>
          <div className="row">
            <div className="col s12 m10 l4 offset-m1 offset-l4">
              <div className="card-panel hoverable">
                <Title/>
                <Body/>
              </div>
            </div>
          </div>
        </VerticalAlign>
      </span>
    );
  }
}
