import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';

import {WritingGoals} from '../../api/writingGoals';

export default class ActiveGoalsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currGoal: ''
    };
  }
  componentDidMount() {
    $('#activeGoals__del-modal').modal();
  }
  renderActiveGoals() {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const threeDays  = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

    return this.props.activeGoals.map((goal) => {
      const day = goal.deadline.getDate();
      const month = goal.deadline.getMonth() + 1;
      const year = goal.deadline.getFullYear();
      const deadline = `Deadline: ${month}/${day}/${year}`;
      let color = '';

      if (goal.deadline < yesterday) {
        color = 'red-text';
      } else if (goal.deadline < threeDays) {
        color = 'yellow-text text-darken-4';
      } else {
        color = 'black-text'
      }

      return (
        <li key={goal._id} name={goal.owner} className="collection-item">

          {goal.description}
          <br/>
          <span className={color}>{deadline}</span>
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
            <input id={goal._id} type="checkbox" onClick={() => {this.setAchieved(goal._id);}}/>
            <label htmlFor={goal._id}></label>
          </span>
          <i className="activeGoals__delete-btn material-icons red-text text-lighten-3" onClick={() => {this.onDelete(goal);}}>delete</i>
        </a>
      );
    }
  }
  setAchieved(id) {
    setTimeout(() => {
      Meteor.call('writingGoals.setAchieved', id, (error, result) => {
        if (!error) {
          const $msg = $('<span class="green-text text-accent-3">Goal Marked Achieved</span>')
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
    $('#activeGoals__del-modal').modal('open');
  }
  confDelete() {
    Meteor.call('writingGoals.remove', this.state.currGoal._id, (error, result) => {
      if (!error) {
        $('#activeGoals__del-modal').modal('close');
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
          {this.renderActiveGoals()}
        </ul>

        <div id="activeGoals__del-modal" className="modal">
          <div className="modal-content">

            <p className="center-align">Delete goal?</p>

            <p id="activeGoals__del-modal-text" className="center-align">{this.state.currGoal.description}</p>

            <p className="center-align">
              <a className="activeGoals__del-modal-btn grey lighten-4 red-text waves-effect btn-flat" onClick={() => {this.confDelete();}}>Delete</a>
              <a className="activeGoals__del-modal-btn modal-action modal-close grey lighten-4 waves-effect btn-flat">Cancel</a>
            </p>

          </div>
        </div>

    </span>
    );
  }
}
