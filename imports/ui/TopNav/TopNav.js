import {Accounts} from 'meteor/accounts-base';
import React from 'react';
import ReactDOM from 'react-dom';

export default class TopNav extends React.Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.dropdown)).dropdown();
  }
  onLogout() {
    Accounts.logout();
  }
  render() {
    return(
      <span>

        <nav>
          <div className={`nav-wrapper ${this.props.color}`}>

            <a className="brand-logo center">{this.props.title}</a>

            <ul id="nav-mobile" className="right">
              <li>
                <a id="dropdown__account-btn" className="dropdown-button" ref="dropdown" data-activates="dropdown__account">
                  <i className="material-icons">account_circle</i>
                </a>
              </li>
            </ul>

          </div>
        </nav>

        <ul id="dropdown__account" className="dropdown-content">
          <li>
            <a className="black-text" onClick={this.onLogout.bind(this)}>Logout</a>
          </li>
        </ul>

      </span>
    );
  }
}
