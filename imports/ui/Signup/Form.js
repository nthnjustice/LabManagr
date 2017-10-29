import {Meteor} from 'meteor/meteor';
import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstErr: '*',
      firstVal: '',
      lastErr: '*',
      lastVal: '',
      emailErr: '*',
      emailVal: '',
      emailConfErr: '*',
      emailConfVal: '',
      passErr: '*',
      passVal: '',
      passConfErr: '*',
      passConfVal: ''
    };
  }
  validateFirst(first) {
    if (!first) {
      this.setState({firstErr: "* can't be blank", firstVal: 'invalid'});
      return false;
    } else {
      this.setState({firstErr: '*', firstVal: 'valid'});
      return true;
    }
  }
  validateLast(last) {
    if (!last) {
      this.setState({lastErr: "* can't be blank", lastVal: 'invalid'});
      return false;
    } else {
      this.setState({lastErr: '*', lastVal: 'valid'});
      return true;
    }
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
  validateEmailConf(email, emailConf) {
    if (!emailConf) {
      this.setState({emailConfErr: "* can't be blank", emailConfVal: 'invalid'});
      return false;
    } else if (email !== emailConf) {
      this.setState({emailConfErr: '* does not match', emailConfVal: 'invalid'});
      return false;
    } else {
      this.setState({emailConfErr: '*', emailConfVal: 'valid'});
      return true;
    }
  }
  validatePass(pass) {
    if (!pass) {
      this.setState({passErr: "* can't be blank", passVal: 'invalid'});
      return false;
    } else if (pass.length < 7) {
      this.setState({passErr: '* must be at least 6 characters', passVal: 'invalid'});
      return false;
    } else {
      this.setState({passErr: '*', passVal: 'valid'});
      return true;
    }
  }
  validatePassConf(pass, passConf) {
    if (!passConf) {
      this.setState({passConfErr: "* can't be blank", passConfVal: 'invalid'});
      return false;
    } else if (pass !== passConf) {
      this.setState({passConfErr: '* does not match', passConfVal: 'invalid'});
      return false;
    } else {
      this.setState({passConfErr: '*', passConfVal: 'valid'});
      return true;
    }
  }
  resetForm() {
    this.setState({
      firstErr: '*',
      firstVal: 'valid',
      lastErr: '*',
      lastVal: 'valid',
      emailErr: '*',
      emailVal: 'valid',
      emailConfErr: '*',
      emailConfVal: 'valid',
      passErr: '*',
      passVal: 'valid',
      passConfErr: '*',
      passConfVal: 'valid'
    });
  }
  onSubmit(e) {
    e.preventDefault();

    let first = this.refs.first.value.trim();
    let last = this.refs.last.value.trim();
    let email = this.refs.email.value.trim();
    let emailConf = this.refs.emailConf.value.trim();
    let pass = this.refs.pass.value.trim();
    let passConf = this.refs.passConf.value.trim();

    let firstVal = this.validateFirst(first);
    let lastVal = this.validateLast(last);
    let emailVal = this.validateEmail(email);
    let emailConfVal = this.validateEmailConf(email, emailConf);
    let passVal = this.validatePass(pass);
    let passConfVal = this.validatePassConf(pass, passConf);

    if (firstVal && lastVal && emailVal && emailConfVal && passVal && passConfVal) {
      Accounts.createUser({
        email,
        password: pass,
        profile: {
          firstName: first,
          lastName: last,
          emailConfirmation: emailConf,
          passwordConfirmation: passConf
        }
      }, (err) => {
        if (!err) {
          this.resetForm();
          Materialize.toast('Welcome!', 5000, 'rounded');
          } else {
            this.setState({
              emailErr: '* already registered',
              emailVal: 'invalid',
              emailConfErr: '* already registered',
              emailConfVal: 'invalid'
            });
          }
        }
      );
    }
  }
  render() {
    return(
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <div className="row">
          <div className="col s12 m6 l6 input-field">
            <input id="first" className={this.state.firstVal} type="text" ref="first"/>
            <label htmlFor="first">
              First Name <span className="red-text">{this.state.firstErr}</span>
            </label>
          </div>
          <div className="col s12 m6 l6 input-field">
            <input id="last" className={this.state.lastVal} type="text" ref="last"/>
            <label htmlFor="last">
              Last Name <span className="red-text">{this.state.lastErr}</span>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l6 input-field">
            <input id="email" className={this.state.emailVal} type="email" ref="email"/>
            <label htmlFor="email">
              Email <span className="red-text">{this.state.emailErr}</span>
            </label>
          </div>
          <div className="col s12 m6 l6 input-field">
            <input id="emailConf" className={this.state.emailConfVal} type="email" ref="emailConf"/>
            <label htmlFor="emailConf">
              Confirm Email <span className="red-text">{this.state.emailConfErr}</span>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l6 input-field">
            <input id="pass" className={this.state.passVal} type="password" ref="pass" autoComplete="new-password"/>
            <label htmlFor="pass">
              Password <span className="red-text">{this.state.passErr}</span>
            </label>
          </div>
          <div className="col s12 m6 l6 input-field">
            <input id="passConf" className={this.state.passConfVal} type="password" ref="passConf" autoComplete="new-password"/>
            <label htmlFor="passConf">
              Confirm Password <span className="red-text">{this.state.passConfErr}</span>
            </label>
          </div>
        </div>
        <div className="row center">
          <button className="btn waves-effect waves-light" type="submit">
            Sign Up <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    );
  }
}
