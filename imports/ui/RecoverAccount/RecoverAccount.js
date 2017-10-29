import React from 'react';
import {Link} from 'react-router-dom';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
import Title from './Title';
import Body from './Body';
import Footer from './Footer';

export default class RecoverAccount extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/dashboard');
    }
  }
  render() {
    return(
      <span id="recover-account">
        <VerticalAlign>
          <div className="row">
            <div className="col s12 m10 l6 offset-m1 offset-l3">
              <div className="card-panel hoverable">
                <Title/>
                <Body/>
                <Footer/>
              </div>
            </div>
          </div>
        </VerticalAlign>
      </span>
    );
  }
}
