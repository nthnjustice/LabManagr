import React from 'react';

export default class SideNav extends React.Component {
  componentDidMount() {
    $('#side-nav__button-collapse').sideNav();
    $('#side-nav__item-list').collapsible();

    $('li.side-nav__item').click(function(e) {
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
          <li id="side-nav__title" className="white-text">
            <h4 className="center-align">LabManagr</h4>
            <div className="divider white"></div>
          </li>

          <li className="no-padding">
            <ul id="side-nav__item-list" className="collapsible">

              <li className="side-nav__item" ref="BulletinBoard">
                <a className="collapsible-header" onClick={() => {this.handleModuleChange('Bulletin Board');}}>
                  <i className="material-icons">dashboard</i>
              	  <span className="side-nav__item-text">Bulletin Board</span>
                </a>
              </li>

              <li className="side-nav__item" ref="WritingLog">
                <a className="collapsible-header active" onClick={() => {this.handleModuleChange('Writing Log');}}>
                  <i className="material-icons">mode_edit</i>
              	  <span className="side-nav__item-text">Writing Log</span>
                </a>
              </li>

            </ul>
          </li>

        </ul>

        <a id="side-nav__button-collapse" className="button-collapse hide-on-large-only" data-activates="side-nav">
          <i className="material-icons">menu</i>
        </a>

      </span>
    );
  }
}
