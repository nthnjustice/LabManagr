import React from 'react';

import {secureAlarmStart, secureAlarmFinished, secureAlarmExcess} from './Alarm';

export default class AlarmForm extends React.Component {
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
    let start = secureAlarmStart();
    let finished = secureAlarmFinished();
    let excess = secureAlarmExcess();
    let milliseconds = (finished - start) + (excess * 1000);

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

            $('#alarm-title').val(undefined);
            $('#alarm-title-label').removeClass('active');
            $('#alarm-modal').modal('close');

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
          <input id="alarm-title" className={this.state.titleVal} type="text" ref="title" name="alarm-title"/>
          <label id="alarm-title-label" htmlFor="alarm-title">
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
