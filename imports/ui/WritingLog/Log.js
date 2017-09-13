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

export default class Log extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      dateErr: '*',
      dateVal: 'datepicker',
      titleErr: '*',
      titleVal: '',
      hrVal: '',
      minVal: ''
    };
  }
  componentDidMount() {
    $('#log__date').pickadate({
      closeOnSelect: true
    });
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
  validateTitle(title) {
    if (!title) {
      this.setState({titleErr: "* can't be blank", titleVal: 'invalid'});
      return false;
    } else {
      this.setState({titleErr: '*', titleVal: 'valid'});
      return true;
    }
  }
  validateTime(hr, min) {
    if (!hr && !min) {
      this.setState({error: 'invalid time', hrVal: 'invalid', minVal: 'invalid'});
      return false;
    } else if (hr < 0 || min < 0) {
      this.setState({error: 'invalid time', hrVal: 'invalid', minVal: 'invalid'});
      return false;
    } else if (hr == 0 && min == 0) {
      this.setState({error: 'invalid time', hrVal: 'invalid', minVal: 'invalid'});
      return false;
    } else {
      this.setState({error: '', hrVal: 'valid', minVal: 'valid'});
      return true;
    }
  }
  resetForm() {
    $('#log__date').val(undefined);
    $('#log__date-label').removeClass('active');
    $('#log__title').val(undefined);
    $('#log__title-label').removeClass('active');
    $('#log__hr').val(undefined);
    $('#log__hr-label').removeClass('active');
    $('#log__min').val(undefined);
    $('#log__min-label').removeClass('active');
  }
  onSubmit(e) {
    e.preventDefault();

    let date = this.refs.date.value.trim();
    const title = this.refs.title.value.trim();
    const hr = Number(this.refs.hr.value.trim());
    const min = Number(this.refs.min.value.trim());

    const dateVal = this.validateDate(date);
    const titleVal = this.validateTitle(title);
    let timeVal = false;

    if (dateVal && titleVal) {
      timeVal = this.validateTime(hr, min);
    }

    if (timeVal) {
      let minTot = min + (hr * 60);
      let hours = Math.floor(minTot / 60);
      let minutes = minTot % 60;
      date = formatDate(date);

      Meteor.call('writingLogs.insert', title, hours, minutes, date,
        (error, results) => {
          if (!error) {
            this.setState({
              error: '',
              dateErr: '*',
              dateVal: 'datepicker',
              titleErr: '*',
              titleVal: '',
              hrVal: '',
              minVal: ''
            });

            this.resetForm();
            const $msg = $('<span class="green-text text-accent-3">Writing Log Saved</span>')
            Materialize.toast($msg, 5000, 'rounded');
          } else {
            const $msg = $('<span class="red-text">Error: Writing Log Not Saved</span>')
            Materialize.toast($msg, 5000, 'rounded');
          }
        }
      );
    }
  }
  render() {
    return(
      <div className="card large hoverable">

        <div id="log__header" className="indigo darken-4">
          <h5 className="white-text">Log Session</h5>
        </div>

        <div className="container valign-wrapper">
          <form onSubmit={this.onSubmit.bind(this)} noValidate>

            <div className="row red lighten-5">
              {
                this.state.error
                  ? <p id="log__error" className="center-align red-text text-darken-4">{this.state.error}</p>
                  : undefined
              }
            </div>

            <div className="row">
              <div className="input-field col l12">
                <input id="log__date" className={this.state.dateVal} type="text" ref="date"/>
                <label id="log__date-label" htmlFor="log__date">
                  Date <span className="red-text">{this.state.dateErr}</span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col l12">
                  <input id="log__title" className={this.state.titleVal} type="text" ref="title"/>
                  <label id="log__title-label" htmlFor="log__title">
                    Title <span className="red-text">{this.state.titleErr}</span>
                  </label>
              </div>
            </div>

            <div className="row">

              <div className="input-field col l6">
                  <input id="log__hr" className={this.state.hrVal} type="number" ref="hr"/>
                  <label id="log__hr-label" htmlFor="log__hr">
                    Hours
                  </label>
              </div>

              <div className="input-field col l6">
                  <input id="log__min" className={this.state.minVal} type="number" ref="min"/>
                  <label id="log__min-label" htmlFor="log__min">
                    Minutes
                  </label>
              </div>

            </div>

            <div id="log__btn-wrapper" className="row center">
              <button className="btn waves-effect waves-light" type="submit">
                Post <i className="material-icons right">send</i>
              </button>
            </div>

          </form>
        </div>

      </div>
    );
  }
}
