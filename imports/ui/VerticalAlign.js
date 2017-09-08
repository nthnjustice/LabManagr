import React from 'react';

export default class VerticalAlign extends React.Component {
  render() {
    return(
      <div className="vertical-align-outer">
        <div className="vertical-align-middle">
          <div className="vertical-align-inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
