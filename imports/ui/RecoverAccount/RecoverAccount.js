import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardText} from 'material-ui/Card';

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
            <div className="col s12 m6 l4 offset-m3 offset-l4">
              <MuiThemeProvider>
                <Card>
                  <CardText>
                    <Title/>
                    <Body/>
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
