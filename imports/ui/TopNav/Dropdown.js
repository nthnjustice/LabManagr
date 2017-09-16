import {Accounts} from 'meteor/accounts-base';
import React from 'react';

export default class Dropdown extends React.Component {
  onLogout() {
    Accounts.logout();
  }
  render() {
    return(
      <ul id="dropdown__account" className="dropdown-content">
        <li>
          <a className="black-text" onClick={this.onLogout.bind(this)}>Logout</a>
        </li>
      </ul>
    );
  }
}
