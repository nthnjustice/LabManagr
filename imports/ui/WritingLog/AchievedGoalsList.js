import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';

import {WritingGoals} from '../../api/writingGoals';

export default class AchievedGoalsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currGoal: ''
    };
  }
  componentDidMount() {
    $('#achievedGoals__del-modal').modal();
  }
  renderAchievedGoals() {
    return this.props.achievedGoals.map((goal) => {
      const day = goal.deadline.getDate();
      const month = goal.deadline.getMonth() + 1;
      const year = goal.deadline.getFullYear();
      const deadline = `Deadline: ${month}/${day}/${year}`;

      return (
        <li key={goal._id} name={goal.owner} className="collection-item">

          {goal.description}
          <br/>
          <span>{deadline}</span>
          {this.renderSecondaryContent(goal)}

        </li>
      );
    });
  }
  renderSecondaryContent(goal) {
    if (this.props.selectedUser == Meteor.userId()) {
      return (
        <a className="secondary-content">
          <span className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Mark Achieved">
            <input id={goal._id} type="checkbox" onClick={() => {this.setActive(goal._id);}}/>
            <label htmlFor={goal._id}></label>
          </span>
          <i className="activeGoals__delete-btn material-icons red-text text-lighten-3" onClick={() => {this.onDelete(goal);}}>delete</i>
        </a>
      );
    }
  }
  setActive(id) {
    setTimeout(() => {
      Meteor.call('writingGoals.setActive', id, (error, result) => {
        if (!error) {
          const $msg = $('<span class="green-text text-accent-3">Goal Marked Active</span>')
          Materialize.toast($msg, 5000, 'rounded');
        } else {
          const $msg = $('<span class="red-text">Error: Goal Did Not Update</span>')
          Materialize.toast($msg, 5000, 'rounded');
        }
      });
    }, 1000);
  }
  onDelete(goal) {
    this.setState({currGoal: goal});
    $('#achievedGoals__del-modal').modal('open');
  }
  confDelete() {
    Meteor.call('writingGoals.remove', this.state.currGoal._id, (error, result) => {
      if (!error) {
        $('#achievedGoals__del-modal').modal('close');
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

        <div id="achievedGoals__del-modal" className="modal">
          <div className="modal-content">

            <p className="center-align">Delete goal?</p>

            <p id="achievedGoals__del-modal-text" className="center-align">{this.state.currGoal.description}</p>

            <p className="center-align">
              <a className="achievedGoals__del-modal-btn grey lighten-4 red-text waves-effect btn-flat" onClick={() => {this.confDelete();}}>Delete</a>
              <a className="achievedGoals__del-modal-btn modal-action modal-close grey lighten-4 waves-effect btn-flat">Cancel</a>
            </p>

          </div>
        </div>

    </span>
    );
  }
}
