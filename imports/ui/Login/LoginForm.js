import {Meteor} from 'meteor/meteor';
import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      emailErr: '*',
      emailVal: '',
      passErr: '*',
      passVal: ''
    };
  }
  validateEmail(email) {
    let regex = /\S+@\S+\.\S+/;

    if (!email) {
      this.setState({emailErr: "* can't be blank", emailVal: 'invalid'});
      return false;
    } else if (!regex.test(email)) {
      this.setState({emailErr: '* invalid format', emailVal: 'invalid'});
      return false;
    } else {
      this.setState({emailErr: '*', emailVal: 'valid'});
      return true;
    }
  }
  validatePass(pass) {
    if (!pass) {
      this.setState({passErr: "* can't be blank", passVal: 'invalid'});
      return false;
    } else {
      this.setState({passErr: '*', passVal: 'valid'});
      return true;
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let pass = this.refs.pass.value.trim();

    let emailVal = this.validateEmail(email);
    let passVal = this.validatePass(pass);

    if (emailVal && passVal) {
      Meteor.loginWithPassword({email}, pass, (err) => {
        if (err) {
          this.setState({
            error: 'invalid Email/Password combination',
            emailVal: 'invalid',
            passVal: 'invalid'
          });
        } else {
          this.setState({
            error: '',
            emailVal: 'valid',
            passVal: 'valid'
          });
        }
      });
    }
  }
  render() {
    return(
      <form onSubmit={this.onSubmit.bind(this)} noValidate>

        <div className="row red lighten-5">
          {
            this.state.error
              ? <p id="login-form-error" className="center-align red-text text-darken-4">{this.state.error}</p>
              : undefined
          }
        </div>

        <div className="input-field">
          <i className="material-icons prefix">email</i>
          <input id="email" className={this.state.emailVal} type="email" ref="email" name="email"/>
          <label htmlFor="email">
            Email <span className="red-text">{this.state.emailErr}</span>
          </label>
        </div>

        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input id="pass" className={this.state.passVal} type="password" ref="pass" name="pass" autoComplete="new-password"/>
          <label htmlFor="pass">
            Password <span className="red-text">{this.state.passErr}</span>
          </label>
        </div>

        <div className="section row center">
          <button className="btn waves-effect waves-light" type="submit">
            Sign In <i className="material-icons right">send</i>
          </button>
        </div>

      </form>
    );
  }
}
