import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import React from 'react';

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
      </span>
    );
  }
}
