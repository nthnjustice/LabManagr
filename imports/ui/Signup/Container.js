import React from 'react';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
import Title from './Title';
import Form from './Form';
import Footer from './Footer';

export default class Container extends React.Component {
  render() {
    return(
      <VerticalAlign>
        <div className="row">
          <div className="col l6 offset-l3">
            <div className="card-panel hoverable">
              <Title/>
              <Form/>
              <Footer/>
            </div>
          </div>
        </div>
      </VerticalAlign>
    );
  }
}
