import React from 'react';

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
  resetForm() {
    $('#timer #title').val(undefined);
    $('#timer #title-label').removeClass('active');
  }
  onSubmit(e) {
    e.preventDefault();

    let title = this.refs.title.value.trim();
    let seconds = this.props.time;

    let titleVal = this.validateTitle(title);

    if (titleVal) {
      let minTot = Math.round(seconds / 60)
      let hours = Math.floor(minTot / 60);
      let minutes = minTot % 60;
      let date = new Date();

      Meteor.call('writingLogs.insert', title, hours, minutes, date, (err) => {
        if (!err) {
          this.setState({
            titleErr: '*',
            titleVal: ''
          });

          this.resetForm();
          this.props.closeModal();

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
      <div className="section container">
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <div className="input-field col s12 m12 l12">
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
      </div>
    );
  }
}
