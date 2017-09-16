import React from 'react';

import {secureTimerTime} from './helpers';

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
    console.log('submit');
    e.preventDefault();

    const title = this.refs.title.value.trim();
    const seconds = secureTimerTime();

    const titleVal = this.validateTitle(title);

    if (titleVal) {
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

          $('#timer #title').val(undefined);
          $('#timer #title-label').removeClass('active');
          $('#timer .modal').modal('close');

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
