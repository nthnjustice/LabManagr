import {Meteor} from 'meteor/meteor';
import React from 'react';

import {formatDate, formatMonth} from './helpers';

export default class NewGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateErr: '*',
      dateVal: '',
      descErr: '*',
      descVal: ''
    };
  }
  componentDidMount() {
    $('#goals #date').pickadate({closeOnSelect: true});
  }
  validateDesc(desc) {
    if (!desc) {
      this.setState({descErr: "* can't be blank", descVal: 'invalid'});
      return false;
    } else {
      this.setState({descErr: '*', descVal: 'valid'});
      return true;
    }
  }
  validateDate(date) {
    if (!date) {
      this.setState({dateErr: "* can't be blank", dateVal: 'datepicker invalid'});
      return false;
    } else {
      this.setState({dateErr: '*', dateVal: 'datepicker valid'});
      return true;
    }
  }
  resetForm() {
    $('#goals #desc').val(undefined);
    $('#goals #desc-label').removeClass('active');
    $('#goals #date').val(undefined);
    $('#goals #date-label').removeClass('active');
  }
  onSubmit(e) {
    e.preventDefault();

    let desc = this.refs.desc.value.trim();
    let date = this.refs.date.value.trim();

    let descVal = this.validateDesc(desc);
    let dateVal = this.validateDate(date);

    if (descVal && dateVal) {
      date = formatDate(date);

      Meteor.call('writingGoals.insert', desc, date, (err) => {
        if (!err) {
          this.setState({
            dateErr: '*',
            dateVal: '',
            descErr: '*',
            descVal: ''
          });

          this.resetForm();

          let $msg = $('<span class="green-text text-accent-3">Writing Goal Saved</span>')
          Materialize.toast($msg, 5000, 'rounded');
        } else {
          let $msg = $('<span class="red-text">Error: Writing Goal Not Saved</span>')
          Materialize.toast($msg, 5000, 'rounded');
        }
      });
    }
  }
  render() {
    return(
      <div id="new-goal">
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <div className="row">
            <div className="input-field col l10 offset-l1">
                <input id="desc" className={this.state.descVal} type="text" ref="desc"/>
                <label id="desc-label" htmlFor="desc">
                  Description <span className="red-text">{this.state.descErr}</span>
                </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col l10 offset-l1">
              <input id="date" className={`datepicker ${this.state.dateVal}`} type="text" ref="date"/>
              <label id="date-label" htmlFor="date">
                Deadline <span className="red-text">{this.state.dateErr}</span>
              </label>
            </div>
          </div>
          <div className="row center">
            <button className="btn waves-effect waves-light" type="submit">
              Post <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
