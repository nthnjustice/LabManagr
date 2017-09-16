import React from 'react';
import ReactDOM from 'react-dom';

import Dropdown from './Dropdown';

export default class TopNav extends React.Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.dropdown)).dropdown();
  }
  render() {
    return(
      <span id="top-nav">
        <nav>
          <div className={`nav-wrapper ${this.props.color}`}>
            <a className="brand-logo center">{this.props.title}</a>
            <ul id="nav-mobile" className="right">
              <li>
                <a className="dropdown-button" ref="dropdown" data-activates="dropdown__account">
                  <i className="material-icons">account_circle</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Dropdown/>
      </span>
    );
  }
}
