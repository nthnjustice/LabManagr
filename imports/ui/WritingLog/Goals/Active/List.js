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
    $('#active #goals .modal').modal();
  }
  renderGoals() {
    if (this.props.goals.length > 0) {
      let today = new Date();
      let yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      let threeDays  = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

      return this.props.goals.map((goal) => {
        let day = goal.deadline.getDate();
        let month = goal.deadline.getMonth() + 1;
        let year = goal.deadline.getFullYear();
        let deadline = `Deadline: ${month}/${day}/${year}`;
        let color = '';

        if (goal.deadline < yesterday) {
          color = 'red-text';
        } else if (goal.deadline < threeDays) {
          color = 'yellow-text text-darken-4';
        } else {
          color = 'black-text'
        }

        return (
          <li key={goal._id} className="collection-item">
            {goal.description}
            <br/>
            <span className={color}>{deadline}</span>
            {this.renderSecondaryContent(goal)}
          </li>
        );
      });
    } else {
      return <p className="no-goal-text grey-text">No active goals set.</p>;
    }
  }
  renderSecondaryContent(goal) {
    if (this.props.selectedUserId == Meteor.userId()) {
      return (
        <a className="secondary-content">
          <input id={goal._id} type="checkbox" onClick={() => {this.setAchieved(goal._id);}}/>
          <label htmlFor={goal._id}></label>
          <i className="delete-btn material-icons red-text text-lighten-3" onClick={() => {this.onDelete(goal);}}>delete</i>
        </a>
      );
    }
  }
  setAchieved(id) {
    setTimeout(() => {
      Meteor.call('writingGoals.setAchieved', id, (err) => {
        if (!err) {
          let $msg = $('<span class="green-text text-accent-3">Goal Marked Achieved</span>')
          Materialize.toast($msg, 5000, 'rounded');
        } else {
          let $msg = $('<span class="red-text">Error: Goal Did Not Update</span>')
          Materialize.toast($msg, 5000, 'rounded');
        }
      });
    }, 500);
  }
  onDelete(goal) {
    this.setState({currGoal: goal});
    $('#active #goals .modal').modal('open');
  }
  confDelete() {
    Meteor.call('writingGoals.remove', this.state.currGoal._id, (err) => {
      if (!err) {
        $('#active #goals .modal').modal('close');

        let $msg = $('<span class="green-text text-accent-3">Goal Deleted</span>');
        Materialize.toast($msg, 5000, 'rounded');
      } else {
        let $msg = $('<span class="red-text">Error: Goal Did Not Delete</span>');
        Materialize.toast($msg, 5000, 'rounded');
      }
    });
  }
  render() {
    return(
      <span>
        <ul className="collection">
          {this.renderGoals()}
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
