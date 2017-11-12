import {Meteor} from 'meteor/meteor';
import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      emailIcon: '',
      emailError: '',
      emailValid: '',
      emailInvalid: '',
      emailValue: '',
      passwordIcon: '',
      passwordError: '',
      passwordValid: '',
      passwordInvalid: '',
      passwordValue: ''
    };
  }
  validateEmail() {
    let regex = /\S+@\S+\.\S+/;

    if (!this.state.emailValue) {
      this.setState({
        emailIcon: 'red-text',
        emailError: 'This field is required',
        emailValid: '',
        emailInvalid: 'invalid'
      });

      return false;
    } else if (!regex.test(this.state.emailValue)) {
      this.setState({
        emailIcon: 'red-text',
        emailError: 'Please use a valid format',
        emailValid: '',
        emailInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        emailIcon: 'green-text',
        emailError: '',
        emailValid: 'valid',
        emailInvalid: ''
      });

      return true;
    }
  }
  validatePassword() {
    if (!this.state.passwordValue) {
      this.setState({
        passwordIcon: 'red-text',
        passwordError: 'This field is required',
        passwordValid: '',
        passwordInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        passwordIcon: 'green-text',
        passwordError: '',
        passwordValid: 'valid',
        passwordInvalid: ''
      });

      return true;
    }
  }
  resetForm() {
    this.setState({
      error: '',
      emailIcon: '',
      emailError: '',
      emailValid: '',
      emailInvalid: '',
      emailValue: '',
      passwordIcon: '',
      passwordError: '',
      passwordValid: '',
      passwordInvalid: '',
      passwordValue: ''
    });
  }
  handleEmailChange(e) {
    e.preventDefault();

    this.setState({
      emailIcon: 'black-text',
      emailError: '',
      emailValid: '',
      emailInvalid: '',
      emailValue: e.target.value
    });
  }
  handlePasswordChange(e) {
    e.preventDefault();

    this.setState({
      passwordIcon: 'black-text',
      passwordError: '',
      passwordValid: '',
      passwordInvalid: '',
      passwordValue: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    let validEmail = this.validateEmail();
    let validPassword = this.validatePassword();

    if (validEmail && validPassword) {
      let email = this.state.emailValue;
      let password = this.state.passwordValue;

      this.setState({
        error: ''
      });

      Meteor.loginWithPassword({email}, password, (error) => {
        if (!error) {
          this.resetForm();
          Materialize.toast('Welcome Back!', 5000, 'rounded');
        } else {
          this.setState({
            error: 'Invalid Email/Password Combination',
            emailIcon: 'red-text',
            emailValid: '',
            emailInvalid: 'invalid',
            passwordIcon: 'red-text',
            passwordValid: '',
            passwordInvalid: 'invalid'
          });
        }
      });
    }
  }
  render() {
    return(
      <div className="section container">
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          {
            this.state.error
              ? <span>
                  <div className="error-wrapper row red lighten-5">
                    <p className="error red-text text-darken-4 center-align">Invalid Email/Password Combination</p>
                  </div>
                </span>
              : undefined
          }
          <div className="row input-field">
            <i className={`${this.state.emailIcon} material-icons prefix`}>email</i>
            <input
              id="email"
              className={`${this.state.emailValid} ${this.state.emailInvalid}`}
              type="email"
              onChange={this.handleEmailChange.bind(this)}
            />
            <label data-error={this.state.emailError} htmlFor="email">
              Email <span className="red-text">*</span>
            </label>
          </div>
          <div className="row input-field">
            <i className={`${this.state.passwordIcon} material-icons prefix`}>lock</i>
            <input
              id="password"
              className={`${this.state.passwordValid} ${this.state.passwordInvalid}`}
              type="password"
              autoComplete="new-password"
              onChange={this.handlePasswordChange.bind(this)}
            />
            <label data-error={this.state.passwordError} htmlFor="password">
              Password <span className="red-text">*</span>
            </label>
          </div>
          <div className="required-wrapper">
            <div className="row">
              <p className="red-text center-align">* required</p>
            </div>
          </div>
          <div className="row center">
            <button className="btn waves-effect waves-light" type="submit">
              Sign In <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
