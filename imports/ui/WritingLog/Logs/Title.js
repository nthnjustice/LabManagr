import React from 'react';

import Info from './Info';

export default class Title extends React.Component {
  render() {
    return(
      <div className={`title row ${this.props.color}`}>
        <div className="col s1 m1 l1">
          <Info/>
        </div>
        <div className="col s10 m10 l10">
          <h5 className="center-align white-text">Posted</h5>
        </div>  
      </div>
    );
  }
}
