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
  } else {
    return undefined;
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
    $('#log-date').pickadate();
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
  onSubmit(e) {
    e.preventDefault();

    let date = this.refs.date.value.trim();
    let title = this.refs.title.value.trim();
    let hr = Number(this.refs.hr.value.trim());
    let min = Number(this.refs.min.value.trim());

    let dateVal = this.validateDate(date);
    let titleVal = this.validateTitle(title);
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
              dateErr: '*',
              dateVal: 'datepicker',
              titleErr: '*',
              titleVal: '',
              hrVal: '',
              minVal: ''
            });

            $('#log-date').val(undefined);
            $('#log-date-label').removeClass('active');
            $('#log-title').val(undefined);
            $('#log-title-label').removeClass('active');
            $('#log-hr').val(undefined);
            $('#log-hr-label').removeClass('active');
            $('#log-min').val(undefined);
            $('#log-min-label').removeClass('active');

            let $msg = $('<span class="green-text text-accent-3">Writing Log Saved</span>')
            Materialize.toast($msg, 5000, 'rounded');
          } else {
            let $msg = $('<span class="red-text">Error: Writing Log Not Saved</span>')
            Materialize.toast($msg, 5000, 'rounded');
          }
        }
      );
    }
  }
  render() {
    return(
      <div className="card-panel hoverable">
        <h5>Log Writing Session</h5>
        <div className="divider"></div>

        <div className="section">
          <form onSubmit={this.onSubmit.bind(this)} noValidate>

            <div id="log-form-error-wrapper" className="row red lighten-5">
              {
                this.state.error
                  ? <p id="log-form-error" className="center-align red-text text-darken-4">{this.state.error}</p>
                  : undefined
              }
            </div>

            <div className="row">
              <div className="input-field col l12">
                <input id="log-date" className={this.state.dateVal} type="text" ref="date" name="log-date"/>
                <label id="log-date-label" htmlFor="log-date">
                  Date <span className="red-text">{this.state.dateErr}</span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col l12">
                  <input id="log-title" className={this.state.titleVal} type="text" ref="title" name="log-title"/>
                  <label id="log-title-label" htmlFor="log-title">
                    Title <span className="red-text">{this.state.titleErr}</span>
                  </label>
              </div>
            </div>

            <div className="row">

              <div className="input-field col l6">
                  <input id="log-hr" className={this.state.hrVal} type="number" ref="hr" name="log-hr"/>
                  <label id="log-hr-label" htmlFor="log-hr">
                    Hours
                  </label>
              </div>

              <div className="input-field col l6">
                  <input id="log-min" className={this.state.minVal} type="number" ref="min" name="log-min"/>
                  <label id="log-min-label" htmlFor="log-min">
                    Minutes
                  </label>
              </div>

            </div>

            <div className="section row center">
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
