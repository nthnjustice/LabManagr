import React from 'react';

export default class Items extends React.Component {
  componentDidMount() {
    $('#side-nav .items').collapsible();
    $('#side-nav li.item').click(function(e) {
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
        <li className="no-padding">
          <ul className="items collapsible">
            <li className="item" ref="BulletinBoard">
              <a className="collapsible-header" onClick={() => {this.handleModuleChange('Bulletin Board');}}>
                <i className="material-icons">dashboard</i>
            	  <span className="item-text">Bulletin Board</span>
              </a>
            </li>
            <li className="item" ref="WritingLog">
              <a className="collapsible-header active" onClick={() => {this.handleModuleChange('Writing Log');}}>
                <i className="material-icons">mode_edit</i>
            	  <span className="item-text">Writing Log</span>
              </a>
            </li>
          </ul>
        </li>
      </span>
    );
  }
}
