import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Link} from 'react-router-dom';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
import Title from './Title';
import Form from './Form';
import Footer from './Footer';

export default class Login extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/dashboard');
    }
  }
  render() {
    return(
      <span id="login">
        <VerticalAlign>
          <div className="row">
            <div className="col l4 offset-l4">
              <div className="card-panel hoverable">
                <Title/>
                <Form/>
                <Footer/>
              </div>
            </div>
          </div>
        </VerticalAlign>
      </span>
    );
  }
}
