import React from 'react';

import {secureAlarmStart, secureAlarmFinished, secureAlarmExcess} from './helpers';

export default class Form extends React.Component {
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
      const seconds = Math.round(milliseconds / 1000)
      const minTot = Math.round(seconds / 60)
      const hours = Math.floor(minTot / 60);
      const minutes = minTot % 60;

      const date = new Date();

      Meteor.call('writingLogs.insert', title, hours, minutes, date, (err) => {
        if (!err) {
          this.setState({
            titleErr: '*',
            titleVal: ''
          });

          $('#alarm #title').val(undefined);
          $('#alarm #title-label').removeClass('active');
          $('#alarm .modal').modal('close');

          let $msg = $('<span class="green-text text-accent-3">Writing Log Saved</span>')
          Materialize.toast($msg, 5000, 'rounded');
        } else {
          let $msg = $('<span class="red-text">Error: Writing Log Not Saved</span>')
          Materialize.toast($msg, 5000, 'rounded');
        }
      });
    }
  }
  render() {
    return(
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <div className="input-field col l8 offset-l2">
          <input id="title" className={this.state.titleVal} type="text" ref="title"/>
          <label id="title-label" htmlFor="title">
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
