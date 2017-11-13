import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardText} from 'material-ui/Card';

import VerticalAlign from '../VerticalAlign/VerticalAlign';
import Title from './Title';
import Body from './Body';

export default class PageNotFound extends React.Component {
  render() {
    return(
      <span id="PageNotFound">
        <VerticalAlign>
          <div className="row">
            <div className="col s12 m6 l4 offset-m3 offset-l4">
              <MuiThemeProvider>
                <Card>
                  <CardText>
                    <Title/>
                    <Body/>
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
