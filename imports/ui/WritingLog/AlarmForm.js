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

    const title = this.refs.title.value.trim();
    const start = secureAlarmStart();
    const finished = secureAlarmFinished();
    const excess = secureAlarmExcess();
    const milliseconds = (finished - start) + (excess * 1000);

    const titleVal = this.validateTitle(title);

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

            $('#alarm__title').val(undefined);
            $('#alarm__title-label').removeClass('active');
            $('#alarm__modal').modal('close');

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
          <input id="alarm__title" className={this.state.titleVal} type="text" ref="title"/>
          <label id="alarm__title-label" htmlFor="alarm__title">
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
