import React from 'react';

import {secureStopwatchTime, resetStopwatch} from './Stopwatch';

export default class StopwatchForm extends React.Component {
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

    let title = this.refs.title.value.trim();
    let milliseconds = secureStopwatchTime();

    let titleVal = this.validateTitle(title);

    if (titleVal) {
      let seconds = Math.round(milliseconds / 1000)
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

            resetStopwatch();
            $('#stopwatch-title').val(undefined);
            $('#stopwatch-title-label').removeClass('active');

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
      <div className="section">
        <form onSubmit={this.onSubmit.bind(this)} noValidate>

          <div className="input-field col l10 offset-l1">
            <input id="stopwatch-title" className={this.state.titleVal} type="text" ref="title" name="stopwatch-title"/>
            <label id="stopwatch-title-label" htmlFor="stopwatch-title">
              Title <span className="red-text">{this.state.titleErr}</span>
            </label>
          </div>

          <div className="section row center">
            <button id="stopwatch-submit" className="btn waves-effect waves-light disabled" type="submit">
              Post <i className="material-icons right">send</i>
            </button>
          </div>

        </form>
      </div>
    );
  }
}
