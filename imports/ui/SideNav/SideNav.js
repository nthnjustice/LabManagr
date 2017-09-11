import React from 'react';

export default class SideNav extends React.Component {
  componentDidMount() {
    $('#button-collapse-side-nav').sideNav();
    $('#side-nav-item-list').collapsible();

    $('li.side-nav-item').click(function(e) {
      if ($(this).hasClass('active')) {
        e.stopPropagation();
        $(this).addClass('active');
      };
    });
  }
  handleModuleChange(name) {
    this.props.onSelectModule(name);
  }
  render() {
    return(
      <span>

        <ul id="side-nav" className="side-nav fixed grey darken-4">
          <li id="side-nav-title" className="white-text">
            <h4 className="center-align">LabManagr</h4>
            <div className="divider white"></div>
          </li>

          <li className="no-padding">
            <ul id="side-nav-item-list" className="collapsible">

              <li className="side-nav-item" ref="BulletinBoard">
                <a className="collapsible-header" onClick={() => {this.handleModuleChange('Bulletin Board');}}>
                  <i className="material-icons">dashboard</i>
              	  <span className="side-nav-item-text">Bulletin Board</span>
                </a>
              </li>

              <li className="side-nav-item" ref="WritingLog">
                <a className="collapsible-header active" onClick={() => {this.handleModuleChange('Writing Log');}}>
                  <i className="material-icons">mode_edit</i>
              	  <span className="side-nav-item-text">Writing Log</span>
                </a>
              </li>

            </ul>
          </li>

        </ul>

        <a id="button-collapse-side-nav" className="button-collapse hide-on-large-only" data-activates="side-nav">
          <i className="material-icons">menu</i>
        </a>

      </span>
    );
  }
}
