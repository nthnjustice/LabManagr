import React from 'react';

import Title from './Title';
import Items from './Items';

export default class SideNav extends React.Component {
  componentDidMount() {
    $('#side-nav .button-collapse').sideNav();
  }
  catchModule(name) {
    this.props.onSelectModule(name);
  }
  render() {
    return(
      <span id="side-nav">
        <ul id="side-nav-el" className="side-nav fixed grey darken-4">
          <Title/>
          <Items onSelectModule={this.catchModule.bind(this)}/>
        </ul>
        <a className="button-collapse hide-on-large-only" data-activates="side-nav-el">
          <i className="material-icons white-text">menu</i>
        </a>
      </span>
    );
  }
}
