import React from 'react';

import {secureTimerTime} from './Timer';

export default class TimerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titleErr: '*',
      titleVal: ''
    };
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
  onSubmit(e) {
    e.preventDefault();

    const title = this.refs.title.value.trim();
    const seconds = secureTimerTime();

    const titleVal = this.validateTitle(title);

    if (titleVal) {
      let minTot = Math.round(seconds / 60)
      let hours = Math.floor(minTot / 60);
      let minutes = minTot % 60;

      let date = new Date();

      Meteor.call('writingLogs.insert', title, hours, minutes, date,
        (error, results) => {
          if (!error) {
            this.setState({
              titleErr: '*',
              titleVal: ''
            });

            $('#timer__title').val(undefined);
            $('#timer__title-label').removeClass('active');
            $('#timer__modal').modal('close');

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
      <form onSubmit={this.onSubmit.bind(this)} noValidate>

        <div className="input-field col l8 offset-l2">
          <input id="timer__title" className={this.state.titleVal} type="text" ref="title"/>
          <label id="timer__title-label" htmlFor="timer__title">
            Title <span className="red-text">{this.state.titleErr}</span>
          </label>
        </div>

        <div className="section row center">
          <button className="btn waves-effect waves-light" type="submit">
            Post <i className="material-icons right">send</i>
          </button>
        </div>

      </form>
    );
  }
}
