import {Meteor} from 'meteor/meteor';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardText} from 'material-ui/Card';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
import Title from './Title';
import Form from './Form';
import Footer from './Footer';

export default class Signup extends React.Component {
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.replace('/dashboard');
    }
  }
  render() {
    return(
      <span id="signup">
        <VerticalAlign>
          <div className="row">
            <div className="col s12 m10 l6 offset-m1 offset-l3">
              <MuiThemeProvider>
                <Card>
                  <CardText>
                    <Title/>
                    <Form/>
                    <Footer/>
                  </CardText>
                </Card>
              </MuiThemeProvider>
            </div>
          </div>
        </VerticalAlign>
      </span>
    );
  }
}
