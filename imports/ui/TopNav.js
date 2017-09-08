import React from 'react';
import {Accounts} from 'meteor/accounts-base';

export default class TopNav extends React.Component {
  componentDidMount() {
    $('#dropdown-button-account').dropdown();
  }
  onLogout() {
    Accounts.logout();
  }
  render() {
    return(
      <span>

        <nav>
          <div className="nav-wrapper cyan darken-3">

            <a href="#" className="brand-logo center">{this.props.title}</a>

            <ul id="nav-mobile" className="right">
              <li>
                <a id="dropdown-button-account" className="dropdown-button" data-activates="account-dropdown">
                  <i className="material-icons">account_circle</i>
                </a>
              </li>
            </ul>

          </div>
        </nav>

        <ul id="account-dropdown" className="dropdown-content">
          <li>
            <a className="black-text" onClick={this.onLogout.bind(this)}>Logout</a>
          </li>
        </ul>

      </span>
    );
  }
}
