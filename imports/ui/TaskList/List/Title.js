import {Meteor} from 'meteor/meteor';
import React from 'react';

export default class Title extends React.Component {
  onDelete() {
    console.log(`delete clicked for: ${this.props.id}`);
  }
  confDelete() {
    Meteor.call('taskLists.remove', this.props.id, (err) => {
      if (!err) {
        // close modal

        let $msg = $('<span class="green-text text-accent-3">Task List Deleted</span>');
        Materialize.toast($msg, 5000, 'rounded');
      } else {
        let $msg = $('<span class="red-text">Error: Task List Not Delete</span>');
        Materialize.toast($msg, 5000, 'rounded');
      }
    });
  }
  render() {
    return(
      <span id="title">
        <ul className="collection">
          <li className={`collection-item ${this.props.color}`}>
            <div>
              <span className="list-name white-text">{this.props.title}</span>
              <a href="#!" className="secondary-content">
                <i className="delete-btn material-icons white-text" onClick={() => {this.onDelete();}}>delete</i>
              </a>
            </div>
          </li>
        </ul>
        <div className="modal">
          <div className="modal-content">
            <p className="center-align">Delete goal?</p>
            <p className="text center-align">temp</p>
            <p className="center-align">
              <a className="modal-btn btn-flat grey lighten-4 red-text waves-effect" onClick={() => {this.confDelete();}}>Delete</a>
              <a className="modal-btn btn-flat modal-action modal-close grey lighten-4 waves-effect">Cancel</a>
            </p>
          </div>
        </div>
      </span>
    );
  }
}
