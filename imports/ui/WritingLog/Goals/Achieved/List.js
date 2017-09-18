import {Meteor} from 'meteor/meteor';
import React from 'react';

import {WritingGoals} from '../../../../api/writingGoals';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currGoal: ''
    };
  }
  componentDidMount() {
    $('#achieved #goals .modal').modal();
  }
  renderAchievedGoals() {
    return this.props.achievedGoals.map((goal) => {
      const day = goal.deadline.getDate();
      const month = goal.deadline.getMonth() + 1;
      const year = goal.deadline.getFullYear();
      const deadline = `Deadline: ${month}/${day}/${year}`;

      return (
        <li key={goal._id} className="collection-item">
          {goal.description}
          <br/>
          <span>{deadline}</span>
          {this.renderSecondaryContent(goal)}
        </li>
      );
    });
  }
  renderSecondaryContent(goal) {
    if (this.props.selectedUserId == Meteor.userId()) {
      return (
        <a className="secondary-content">
          <input id={goal._id} type="checkbox" onClick={() => {this.setActive(goal._id);}}/>
          <label htmlFor={goal._id}></label>
          <i className="delete-btn material-icons red-text text-lighten-3" onClick={() => {this.onDelete(goal);}}>delete</i>
        </a>
      );
    }
  }
  setActive(id) {
    setTimeout(() => {
      Meteor.call('writingGoals.setActive', id, (err) => {
        if (!err) {
          const $msg = $('<span class="green-text text-accent-3">Goal Marked Active</span>')
          Materialize.toast($msg, 5000, 'rounded');
        } else {
          const $msg = $('<span class="red-text">Error: Goal Did Not Update</span>')
          Materialize.toast($msg, 5000, 'rounded');
        }
      });
    }, 500);
  }
  onDelete(goal) {
    this.setState({currGoal: goal});
    $('#achieved #goals .modal').modal('open');
  }
  confDelete() {
    Meteor.call('writingGoals.remove', this.state.currGoal._id, (err) => {
      if (!err) {
        $('#achieved #goals .modal').modal('close');

        const $msg = $('<span class="green-text text-accent-3">Goal Deleted</span>')
        Materialize.toast($msg, 5000, 'rounded');
      } else {
        const $msg = $('<span class="red-text">Error: Goal Did Not Delete</span>')
        Materialize.toast($msg, 5000, 'rounded');
      }
    });
  }
  render() {
    return(
      <span>
        <ul className="collection">
          {this.renderAchievedGoals()}
        </ul>
        <div className="modal">
          <div className="modal-content">
            <p className="center-align">Delete goal?</p>
            <p className="text center-align">{this.state.currGoal.description}</p>
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