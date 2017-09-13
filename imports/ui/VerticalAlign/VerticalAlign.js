import React from 'react';

export default class VerticalAlign extends React.Component {
  render() {
    return(
      <div id="vertical-align__outer">
        <div id="vertical-align__middle">
          <div id="vertical-align__inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
