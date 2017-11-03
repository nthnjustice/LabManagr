import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import Alarm from './Alarm/Alarm';
import Timer from './Timer/Timer';
import Stopwatch from './Stopwatch/Stopwatch';

let tabsStyles = {
  backgroundColor: "white"
};

let tabStyles = {
  color: "black"
};

let indicatorStyles = {
  background: "black"
};

export default class MyTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 1
    };
  }
  handleTabChange(value) {
    this.setState({slideIndex: value});
  }
  render() {
    return(
      <MuiThemeProvider>
        <div>
        <Tabs
          className="mui-tabs"
          tabItemContainerStyle={tabsStyles}
          inkBarStyle={indicatorStyles}
          value={this.state.slideIndex}
          onChange={this.handleTabChange.bind(this)}
        >
          <Tab label="Timer" value={0} style={tabStyles}/>
          <Tab label="Alarm" value={1} style={tabStyles}/>
          <Tab label="Stopwatch" value={2} style={tabStyles}/>
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleTabChange.bind(this)}
        >
          <Timer/>
          <Alarm/>
          <Stopwatch/>
        </SwipeableViews>
      </div>
      </MuiThemeProvider>
    );
  }
}
