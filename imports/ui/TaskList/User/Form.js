import {Meteor} from 'meteor/meteor';
import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleErr: '*',
      titleVal: ''
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
  resetForm() {
    $('#task-list #user #title').val(undefined);
    $('#task-list #user #title-label').removeClass('active');
  }
  onSubmit(e) {
    e.preventDefault();

    let title = this.refs.title.value.trim();

    let titleVal = this.validateTitle(title);

    if (titleVal) {
      Meteor.call('taskLists.insert', title, (err) => {
        if (!err) {
          this.setState({
            titleErr: '*',
            titleVal: ''
          });

          this.resetForm();

          let $msg = $('<span class="green-text text-accent-3">Task List Created</span>')
          Materialize.toast($msg, 5000, 'rounded');
        } else {
          let $msg = $('<span class="red-text">Error: Task List Not Created</span>')
          Materialize.toast($msg, 5000, 'rounded');
        }
      });
    }
  }
  renderValidForm() {
    return (
      <span>
        <div id="header" className="row center">
          <h4>Build a new List</h4>
        </div>
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <div className="row">
            <div className="input-field col l12">
              <input id="title" className={this.state.titleVal} type="text" ref="title"/>
              <label id="title-label" htmlFor="title">
                Title <span className="red-text">{this.state.titleErr}</span>
              </label>
            </div>
          </div>
          <div className="row center">
            <button className="btn waves-effect waves-light" type="submit">
              Create <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </span>
    );
  }
  renderDisabledForm() {
    this.resetForm();
    return (
      <span>
        <div id="header" className="row center">
          <h4 className="grey-text">Build a new List</h4>
        </div>
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <div className="row">
            <div className="input-field col l12">
              <input disabled id="title" className={this.state.titleVal} type="text" ref="title"/>
              <label id="title-label" htmlFor="title">
                Title <span className="grey-text">{this.state.titleErr}</span>
              </label>
            </div>
          </div>
          <div className="row center">
            <button className="btn waves-effect waves-light disabled" type="submit">
              Create <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </span>
    );
  }
  checkId() {
    if (this.props.selectedUserId == Meteor.userId()) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <span id="form">
        {
          this.checkId()
            ? this.renderValidForm()
            : this.renderDisabledForm()
        }
      </span>
    );
  }
}
