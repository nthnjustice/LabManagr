import {Meteor} from 'meteor/meteor';
import React from 'react';

function formatDate(dateStr) {
  let dateArr = dateStr.split(' ');
  let day = dateArr[0];
  let month = formatMonth(dateArr[1].split(',')[0]);
  let year = dateArr[2];

  return new Date(year, month, day);
}

function formatMonth(month) {
  if (month === 'January') {
    return 0;
  } else if (month === 'February') {
    return 1;
  } else if (month === 'March') {
    return 2;
  } else if (month === 'April') {
    return 3;
  } else if (month === 'May') {
    return 4;
  } else if (month === 'June') {
    return 5;
  } else if (month === 'July') {
    return 6;
  } else if (month === 'August') {
    return 7;
  } else if (month === 'September') {
    return 8;
  } else if (month === 'October') {
    return 9;
  } else if (month === 'November') {
    return 10;
  } else if (month === 'December') {
    return 11;
  }
}

export default class GoalsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateErr: '*',
      dateVal: 'datepicker',
      descErr: '*',
      descVal: ''
    };
  }
  componentDidMount() {
    $('#goals__date').pickadate({
      closeOnSelect: true
    });
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
    $('#goals__desc').val(undefined);
    $('#goals__desc-label').removeClass('active');
    $('#goals__date').val(undefined);
    $('#goals__date-label').removeClass('active');
  }
  onSubmit(e) {
    e.preventDefault();

    const desc = this.refs.desc.value.trim();
    let date = this.refs.date.value.trim();

    const descVal = this.validateDesc(desc);
    const dateVal = this.validateDate(date);

    if (descVal && dateVal) {
      date = formatDate(date);

      Meteor.call('writingGoals.insert', desc, date,
        (error, results) => {
          if (!error) {
            this.setState({
              dateErr: '*',
              dateVal: 'datepicker',
              descErr: '*',
              descVal: ''
            });

            this.resetForm();
            const $msg = $('<span class="green-text text-accent-3">Writing Goal Saved</span>')
            Materialize.toast($msg, 5000, 'rounded');
          } else {
            const $msg = $('<span class="red-text">Error: Writing Goal Not Saved</span>')
            Materialize.toast($msg, 5000, 'rounded');
          }
        }
      );
    }
  }
  render() {
    return(
      <div id="goals__form">
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <div id="goals__input-wrapper">
            <div className="row">
              <div className="input-field col l10 offset-l1">
                  <input id="goals__desc" className={this.state.descVal} type="text" ref="desc"/>
                  <label id="goals__desc-label" htmlFor="goals__desc">
                    Description <span className="red-text">{this.state.descErr}</span>
                  </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col l10 offset-l1">
                <input id="goals__date" className={this.state.dateVal} type="text" ref="date"/>
                <label id="goals__date-label" htmlFor="goals__date">
                  Deadline <span className="red-text">{this.state.dateErr}</span>
                </label>
              </div>
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
