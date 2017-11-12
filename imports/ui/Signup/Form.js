import {Meteor} from 'meteor/meteor';
import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameError: '',
      firstNameValid: '',
      firstNameInvalid: '',
      firstNameValue: '',
      lastNameError: '',
      lastNameValid: '',
      lastNameInvalid: '',
      lastNameValue: '',
      emailError: '',
      emailValid: '',
      emailInvalid: '',
      emailValue: '',
      emailConfirmationError: '',
      emailConfirmationValid: '',
      emailConfirmationInvalid: '',
      emailConfirmationValue: '',
      passwordError: '',
      passwordValid: '',
      passwordInvalid: '',
      passwordValue: '',
      passwordConfirmationError: '',
      passwordConfirmationValid: '',
      passwordConfirmationInvalid: '',
      passwordConfirmationValue: ''
    };
  }
  validateFirstName() {
    if (!this.state.firstNameValue) {
      this.setState({
        firstNameError: "This field is required",
        firstNameValid: '',
        firstNameInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        firstNameError: '',
        firstNameValid: 'valid',
        firstNameInvalid: ''
      });

      return true;
    }
  }
  validateLastName() {
    if (!this.state.lastNameValue) {
      this.setState({
        lastNameError: 'This field is required',
        lastNameValid: '',
        lastNameInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        lastNameError: '',
        lastNameValid: 'valid',
        lastNameInvalid: ''
      });

      return true;
    }
  }
  validateEmail() {
    let regex = /\S+@\S+\.\S+/;

    if (!this.state.emailValue) {
      this.setState({
        emailError: 'This field is required',
        emailValid: '',
        emailInvalid: 'invalid'
      });

      return false;
    } else if (!regex.test(this.state.emailValue)) {
      this.setState({
        emailError: 'Please use a valid format',
        emailValid: '',
        emailInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        emailError: '',
        emailValid: 'valid',
        emailInvalid: ''
      });

      return true;
    }
  }
  validateEmailConfirmation() {
    if (!this.state.emailConfirmationValue) {
      this.setState({
        emailConfirmationError: 'This field is required',
        emailConfirmationValid: '',
        emailConfirmationInvalid: 'invalid'
      });

      return false;
    } else if (this.state.emailValue !== this.state.emailConfirmationValue) {
      this.setState({
        emailConfirmationError: 'Does not match',
        emailConfirmationValid: '',
        emailConfirmationInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        emailConfirmationError: '',
        emailConfirmationValid: 'valid',
        emailConfirmationInvalid: ''
      });

      return true;
    }
  }
  validatePassword() {
    if (!this.state.passwordValue) {
      this.setState({
        passwordError: 'This field is required',
        passwordValid: '',
        passwordInvalid: 'invalid'
      });

      return false;
    } else if (this.state.passwordValue.length < 7) {
      this.setState({
        passwordError: 'Must be at least 6 characters',
        passwordValid: '',
        passwordInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        passwordError: '',
        passwordValid: 'valid',
        passwordInvalid: ''
      });

      return true;
    }
  }
  validatePasswordConfirmation() {
    if (!this.state.passwordConfirmationValue) {
      this.setState({
        passwordConfirmationError: 'This field is required',
        passwordConfirmationValid: '',
        passwordConfirmationInvalid: 'invalid'
      });

      return false;
    } else if (this.state.passwordValue !== this.state.passwordConfirmationValue) {
      this.setState({
        passwordConfirmationError: 'Does not match',
        passwordConfirmationValid: '',
        passwordConfirmationInvalid: 'invalid'
      });

      return false;
    } else {
      this.setState({
        passwordConfirmationError: '',
        passwordConfirmationValid: 'valid',
        passwordConfirmationInvalid: ''
      });

      return true;
    }
  }
  resetForm() {
    this.setState({
      firstNameError: '',
      firstNameValid: '',
      firstNameInvalid: '',
      firstNameValue: '',
      lastNameError: '',
      lastNameValid: '',
      lastNameInvalid: '',
      lastNameValue: '',
      emailError: '',
      emailValid: '',
      emailInvalid: '',
      emailValue: '',
      emailConfirmationError: '',
      emailConfirmationValid: '',
      emailConfirmationInvalid: '',
      emailConfirmationValue: '',
      passwordError: '',
      passwordValid: '',
      passwordInvalid: '',
      passwordValue: '',
      passwordConfirmationError: '',
      passwordConfirmationValid: '',
      passwordConfirmationInvalid: '',
      passwordConfirmationValue: ''
    });
  }
  handleFirstNameChange(e) {
    e.preventDefault();

    this.setState({
      firstNameError: '',
      firstNameValid: '',
      firstNameInvalid: '',
      firstNameValue: e.target.value
    });
  }
  handleLastNameChange(e) {
    e.preventDefault();

    this.setState({
      lastNameError: '',
      lastNameValid: '',
      lastNameInvalid: '',
      lastNameValue: e.target.value
    });
  }
  handleEmailChange(e) {
    e.preventDefault();

    this.setState({
      emailError: '',
      emailValid: '',
      emailInvalid: '',
      emailValue: e.target.value
    });
  }
  handleEmailConfirmationChange(e) {
    e.preventDefault();

    this.setState({
      emailConfirmationError: '',
      emailConfirmationValid: '',
      emailConfirmationInvalid: '',
      emailConfirmationValue: e.target.value
    });
  }
  handlePasswordChange(e) {
    e.preventDefault();

    this.setState({
      passwordError: '',
      passwordValid: '',
      passwordInvalid: '',
      passwordValue: e.target.value
    });
  }
  handlePasswordConfirmationChange(e) {
    e.preventDefault();

    this.setState({
      passwordConfirmationError: '',
      passwordConfirmationValid: '',
      passwordConfirmationInvalid: '',
      passwordConfirmationValue: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    let validFirstName = this.validateFirstName();
    let validLastName = this.validateLastName();
    let validEmail = this.validateEmail();
    let validEmailConfirmation = this.validateEmailConfirmation();
    let validPassword = this.validatePassword();
    let validPasswordConfirmation = this.validatePasswordConfirmation();

    if (validFirstName && validLastName) {
      if (validEmail && validEmailConfirmation) {
        if (validPassword && validPasswordConfirmation) {
          Accounts.createUser({
            email: this.state.emailValue,
            password: this.state.passwordValue,
            profile: {
              firstName: this.state.firstNameValue,
              lastName: this.state.lastNameValue,
              emailConfirmation: this.state.emailConfirmationValue,
              passwordConfirmation: this.state.passwordConfirmationValue
            }
          }, (error) => {
            if (!error) {
              this.resetForm();
              Materialize.toast('Welcome!', 5000, 'rounded');
            } else {
              this.setState({
                emailError: 'Already registered',
                emailValid: '',
                emailInvalid: 'invalid',
                emailConfirmationError: 'Already registered',
                emailConfirmationValid: '',
                emailConfirmationInvalid: 'invalid'
              });
            }
          });
        }
      }
    }
  }
  render() {
    return(
      <div className="section">
        <div className="hide-on-small-only">
          <form onSubmit={this.handleSubmit.bind(this)} noValidate>
            <div className="row">
              <div className="col s12 m6 l6 input-field">
                <input
                  id="firstName"
                  className={`${this.state.firstNameValid} ${this.state.firstNameInvalid}`}
                  type="text"
                  onChange={this.handleFirstNameChange.bind(this)}
                />
                <label data-error={this.state.firstNameError} htmlFor="firstName">
                  First Name <span className="red-text">*</span>
                </label>
              </div>
              <div className="col s12 m6 l6 input-field">
                <input
                  id="lastName"
                  className={`${this.state.lastNameValid} ${this.state.lastNameInvalid}`}
                  type="text"
                  onChange={this.handleLastNameChange.bind(this)}
                />
                <label data-error={this.state.lastNameError} htmlFor="lastName">
                  Last Name <span className="red-text">*</span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 l6 input-field">
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
              <div className="col s12 m6 l6 input-field">
                <input
                  id="emailConfirmation"
                  className={`${this.state.emailConfirmationValid} ${this.state.emailConfirmationInvalid}`}
                  type="email"
                  onChange={this.handleEmailConfirmationChange.bind(this)}
                />
                <label data-error={this.state.emailConfirmationError} htmlFor="emailConfirmation">
                  Confirm Email <span className="red-text">*</span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 l6 input-field">
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
              <div className="col s12 m6 l6 input-field">
                <input
                  id="passwordConfirmation"
                  className={`${this.state.passwordConfirmationValid} ${this.state.passwordConfirmationInvalid}`}
                  type="password"
                  autoComplete="new-password"
                  onChange={this.handlePasswordConfirmationChange.bind(this)}
                />
                <label data-error={this.state.passwordConfirmationError} htmlFor="passwordConfirmation">
                  Password <span className="red-text">*</span>
                </label>
              </div>
            </div>
            <div className="required-wrapper">
              <div className="row">
                <p className="red-text center-align">* required</p>
              </div>
            </div>
            <div className="row center">
              <button className="btn waves-effect waves-light" type="submit">
                Sign Up <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
        <div className="hide-on-med-and-up">
          <form onSubmit={this.handleSubmit.bind(this)} noValidate>
            <div className="row input-field">
              <input
                id="firstName"
                className={`${this.state.firstNameValid} ${this.state.firstNameInvalid}`}
                type="text"
                onChange={this.handleFirstNameChange.bind(this)}
              />
              <label data-error={this.state.firstNameError} htmlFor="firstName">
                First Name <span className="red-text">*</span>
              </label>
            </div>
            <div className="row input-field">
              <input
                id="lastName"
                className={`${this.state.lastNameValid} ${this.state.lastNameInvalid}`}
                type="text"
                onChange={this.handleLastNameChange.bind(this)}
              />
              <label data-error={this.state.lastNameError} htmlFor="lastName">
                Last Name <span className="red-text">*</span>
              </label>
            </div>
            <div className="row input-field">
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
              <input
                id="emailConfirmation"
                className={`${this.state.emailConfirmationValid} ${this.state.emailConfirmationInvalid}`}
                type="email"
                onChange={this.handleEmailConfirmationChange.bind(this)}
              />
              <label data-error={this.state.emailConfirmationError} htmlFor="emailConfirmation">
                Confirm Email <span className="red-text">*</span>
              </label>
            </div>
            <div className="row input-field">
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
            <div className="row input-field">
              <input
                id="passwordConfirmation"
                className={`${this.state.passwordConfirmationValid} ${this.state.passwordConfirmationInvalid}`}
                type="password"
                autoComplete="new-password"
                onChange={this.handlePasswordConfirmationChange.bind(this)}
              />
              <label data-error={this.state.passwordConfirmationError} htmlFor="passwordConfirmation">
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
                Sign Up <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
