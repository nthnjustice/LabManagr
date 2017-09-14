import React from 'react';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
import Title from './Title';
import Body from './Body';
import Footer from './Footer';

export default class Container extends React.Component {
  render() {
    return(
      <VerticalAlign>
        <div className="row">
          <div className="col l4 offset-l4">
            <div className="card-panel hoverable">
              <Title/>
              <div className="section">
                <Body/>
                <Footer/>
              </div>
            </div>
          </div>
        </div>
      </VerticalAlign>
    );
  }
}
