import React from 'react';

export default class Items extends React.Component {
  componentDidMount() {
    $('#side-nav .collapsible').collapsible();
    $('#side-nav li.item').click(function(e) {
      if ($(this).hasClass('active')) {
        e.stopPropagation();
        $(this).addClass('active');
      }
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
            <li className="item">
              <a className="collapsible-header" onClick={() => {this.handleModuleChange('Task List');}}>
                <i className="material-icons">list</i>
            	  <span className="item-text">Task List</span>
              </a>
            </li>
            <li className="item">
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
