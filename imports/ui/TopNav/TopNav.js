import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Accounts} from 'meteor/accounts-base';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownShowing: false,
      dropdownAnchor: {}
    };
  }
  handleDropdownOpen(e) {
    e.preventDefault();

    this.setState({
      dropdownShowing: true,
      dropdownAnchor: e.currentTarget
    });
  }
  handleDropdownClose() {
    this.setState({
      dropdownShowing: false
    });
  }
  handleLogout(e) {
    e.preventDefault()

    Accounts.logout();
  }
  render() {
    return(
      <span id="top-nav">
        <div className="navbar-fixed">
          <nav>
            <div className={`nav-wrapper ${this.props.color}`}>
              <a className="brand-logo center">{this.props.title}</a>
              <ul className="right">
                <li>
                  <a onClick={this.handleDropdownOpen.bind(this)}>
                    <i className="material-icons">account_circle</i>
                  </a>
                  <MuiThemeProvider>
                    <Popover
                      open={this.state.dropdownShowing}
                      anchorEl={this.state.dropdownAnchor}
                      anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'top'
                      }}
                      onRequestClose={this.handleDropdownClose.bind(this)}
                    >
                      <Menu>
                        <MenuItem primaryText="Log Out" onClick={this.handleLogout.bind(this)}/>
                      </Menu>
                    </Popover>
                  </MuiThemeProvider>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </span>
    );
  }
}
