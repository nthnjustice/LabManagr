import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateUnderlineStyle: {
        borderBottom: '1px solid #9e9e9e'
      },
      dateError: ' ',
      dateErrorStyle: {
        float: 'left',
        marginTop: '-24px',
        color: '#9e9e9e'
      },
      dateValue: null,
      titleStyle: {},
      titleError: '',
      titleValid: '',
      titleInvalid: '',
      titleValue: '',
      timeError: '',
      hoursError: '',
      hoursValid: '',
      hoursInvalid: '',
      hoursValue: '',
      minutesError: '',
      minutesValid: '',
      minutesInvalid: '',
      minutesValue: ''
    };
  }
  validateDate() {
    if (!this.state.dateValue) {
      this.setState({
        dateUnderlineStyle: {
          borderBottom: '1px solid #f44336',
          boxShadow: '0 1px 0 0 #f44336'
        },
        dateError: 'This field is required',
        dateErrorStyle: {
          float: 'left',
          marginTop: '-24px',
          color: '#f44336'
        },
        titleStyle: {
          marginTop: '2rem'
        }
      });

      return false;
    } else {
      this.setState({
        dateUnderlineStyle: {
          borderBottom: '1px solid #4caf50',
          boxShadow: '0 1px 0 0 #4caf50'
        },
        dateError: ' ',
        dateErrorStyle: {
          float: 'left',
          marginTop: '-24px',
          color: '#4caf50'
        },
        titleStyle: {}
      });

      return true;
    }
  }
  validateTitle() {
    if (!this.state.titleValue) {
      this.setState({
        titleError: 'This field is required',
        titleValid: '',
        titleInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        titleError: '',
        titleValid: 'valid',
        titleInvalid: ''
      });

      return true;
    }
  }
  validateTime() {
    if (!this.state.hoursValue && !this.state.minutesValue) {
      this.setState({
        timeError: 'Invalid Time',
        hoursError: '',
        hoursValid: '',
        hoursInvalid: 'invalid',
        minutesError: '',
        minutesValid: '',
        minutesInvalid: 'invalid'
      });

      return false;
    } else if (this.state.hoursValue <= 0 && this.state.minutesValue <= 0) {
      this.setState({
        timeError: 'Invalid Time',
        hoursError: '',
        hoursValid: '',
        hoursInvalid: 'invalid',
        minutesError: '',
        minutesValid: '',
        minutesInvalid: 'invalid'
      });

      return false;
    } else if (this.state.hoursValue < 0 || this.state.minutesValue < 0) {
      this.setState({
        timeError: 'Invalid Time',
        hoursError: '',
        hoursValid: '',
        hoursInvalid: 'invalid',
        minutesError: '',
        minutesValid: '',
        minutesInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        timeError: '',
        hoursError: '',
        hoursValid: 'valid',
        hoursInvalid: '',
        minutesError: '',
        minutesValid: 'valid',
        minutesInvalid: ''
      });

      return true;
    }
  }
  formatDateText(date) {
    let month = date.getMonth();

    if (month == 0) {
      month = "January";
    } else if (month == 1) {
      month = "February";
    } else if (month == 2) {
      month = "March";
    } else if (month == 3) {
      month = "April";
    } else if (month == 4) {
      month = "May";
    } else if (month == 5) {
      month = "June";
    } else if (month == 6) {
      month = "July";
    } else if (month == 7) {
      month = "August";
    } else if (month == 8) {
      month = "September";
    } else if (month == 9) {
      month = "October";
    } else if (month == 10) {
      month = "November";
    } else if (month == 11) {
      month = "December";
    }

    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  }
  handleDateChange(e, date) {
    this.setState({
      dateUnderlineStyle: {
        borderBottom: '1px solid #9e9e9'
      },
      dateError: ' ',
      dateErrorStyle: {
        float: 'left',
        marginTop: '-24px',
        color: '#9e9e9e'
      },
      dateValue: date,
      titleStyle: {}
    });
  }
  handleTitleChange(e) {
    e.preventDefault();

    this.setState({
      titleError: '',
      titleValid: '',
      titleInvalid: '',
      titleValue: e.target.value
    });
  }
  handleHoursChange(e) {
    e.preventDefault();

    this.setState({
      hoursError: '',
      hoursValid: '',
      hoursInvalid: '',
      hoursValue: Number(e.target.value),
      minutesError: '',
      minutesValid: '',
      minutesInvalid: '',
    });
  }
  handleMinutesChange(e) {
    e.preventDefault();

    this.setState({
      hoursError: '',
      hoursValid: '',
      hoursInvalid: '',
      minutesError: '',
      minutesValid: '',
      minutesInvalid: '',
      minutesValue: Number(e.target.value)
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    let validDate = this.validateDate();
    let validTitle = this.validateTitle();
    let validTime = this.validateTime();

    if (validDate && validTitle && validTime) {
      let totalMinutes = this.state.minutesValue + (this.state.hoursValue * 60);
      let hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60;

      Meteor.call('writingLogs.insert', this.state.titleValue, hours, minutes, this.state.dateValue, (error) => {
        if (!error) {
          this.setState({
            dateUnderlineStyle: {
              borderBottom: '1px solid #9e9e9e'
            },
            dateError: ' ',
            dateErrorStyle: {
              float: 'left',
              marginTop: '-24px',
              color: '#9e9e9e'
            },
            dateValue: null,
            titleStyle: {},
            titleError: '',
            titleValid: '',
            titleInvalid: '',
            titleValue: '',
            timeError: '',
            hoursError: '',
            hoursValid: '',
            hoursInvalid: '',
            hoursValue: '',
            minutesError: '',
            minutesValid: '',
            minutesInvalid: '',
            minutesValue: ''
          });

          $('#log .title-label').removeClass('active');
          $('#log .hours-label').removeClass('active');
          $('#log .minutes-label').removeClass('active');

          Materialize.toast($('<span class="green-text text-accent-3">Writing Log Saved</span>'), 5000, 'rounded');
        } else {
          Materialize.toast( $('<span class="red-text">Error: Writing Log Not Saved</span>'), 5000, 'rounded');
        }
      });
    }
  }
  render() {
    let dateLabel = <span className="input-label">
                      Date
                      <span className="red-text"> *</span>
                    </span>;

    return(
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <div className="row">
            <MuiThemeProvider>
              <DatePicker
                value={this.state.dateValue}
                textFieldStyle={{width: '100%'}}
                floatingLabelText={dateLabel}
                floatingLabelStyle={{fontSize: '1rem'}}
                autoOk={true}
                underlineStyle={this.state.dateUnderlineStyle}
                errorText={this.state.dateError}
                errorStyle={this.state.dateErrorStyle}
                onChange={this.handleDateChange.bind(this)}
                formatDate={this.formatDateText.bind(this)}
              />
            </MuiThemeProvider>
          </div>
          <div className="row input-field" style={this.state.titleStyle}>
            <input
              id="title"
              className={`${this.state.titleValid} ${this.state.titleInvalid}`}
              type="text"
              value={this.state.titleValue}
              onChange={this.handleTitleChange.bind(this)}
            />
            <label className="title-label" data-error={this.state.titleError} htmlFor="title">
              Title <span className="red-text">*</span>
            </label>
          </div>
          {
            this.state.timeError
              ? <div className="red lighten-5">
                  <p className="error center-align red-text text-darken-4">
                    {this.state.timeError}
                  </p>
                </div>
              : undefined
          }
          <div className="time-input-wrapper row">
            <div className="input-field col s6 m6 l6">
              <input
                id="hours"
                className={`${this.state.hoursValid} ${this.state.hoursInvalid}`}
                type="number"
                value={this.state.hoursValue}
                onChange={this.handleHoursChange.bind(this)}
              />
              <label className="hours-label" data-error={this.state.hourError} htmlFor="hours">
                Hours
              </label>
            </div>
            <div className="input-field col s6 m6 l6">
              <input
                id="minutes"
                className={`${this.state.minutesValid} ${this.state.minutesInvalid}`}
                type="number"
                value={this.state.minutesValue}
                onChange={this.handleMinutesChange.bind(this)}
              />
              <label className="minutes-label" data-error={this.state.minutesError} htmlFor="minutes">
                Minutes
              </label>
            </div>
          </div>
          <div className="required-wrapper">
            <div className="row">
              <p className="red-text center-align">* required</p>
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
