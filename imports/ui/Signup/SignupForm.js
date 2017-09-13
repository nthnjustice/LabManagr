import {Meteor} from 'meteor/meteor';
import React from 'react';

export default class SignupForm extends React.Component {
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
    const regex = /\S+@\S+\.\S+/;

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
  onSubmit(e) {
    e.preventDefault();

    const first = this.refs.first.value.trim();
    const last = this.refs.last.value.trim();
    const email = this.refs.email.value.trim();
    const emailConf = this.refs.emailConf.value.trim();
    const pass = this.refs.pass.value.trim();
    const passConf = this.refs.passConf.value.trim();

    const firstVal = this.validateFirst(first);
    const lastVal = this.validateLast(last);
    const emailVal = this.validateEmail(email);
    const emailConfVal = this.validateEmailConf(email, emailConf);
    const passVal = this.validatePass(pass);
    const passConfVal = this.validatePassConf(pass, passConf);

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

          <div className="col l6 input-field">
            <input id="signup__first" className={this.state.firstVal} type="text" ref="first"/>
            <label htmlFor="signup__first">
              First Name <span className="red-text">{this.state.firstErr}</span>
            </label>
          </div>

          <div className="col l6 input-field">
            <input id="signup__last" className={this.state.lastVal} type="text" ref="last"/>
            <label htmlFor="signup__last">
              Last Name <span className="red-text">{this.state.lastErr}</span>
            </label>
          </div>

        </div>

        <div className="row">

          <div className="col l6 input-field">
            <input id="signup__email" className={this.state.emailVal} type="email" ref="email"/>
            <label htmlFor="signup__email">
              Email <span className="red-text">{this.state.emailErr}</span>
            </label>
          </div>

          <div className="col l6 input-field">
            <input id="signup__emailConf" className={this.state.emailConfVal} type="email" ref="emailConf"/>
            <label htmlFor="signup__emailConf">
              Confirm Email <span className="red-text">{this.state.emailConfErr}</span>
            </label>
          </div>

        </div>

        <div className="row">

          <div className="col l6 input-field">
            <input id="signup__pass" className={this.state.passVal} type="password" ref="pass" autoComplete="new-password"/>
            <label htmlFor="signup__pass">
              Password <span className="red-text">{this.state.passErr}</span>
            </label>
          </div>

          <div className="col l6 input-field">
            <input id="signup__passConf" className={this.state.passConfVal} type="password" ref="passConf" autoComplete="new-password"/>
            <label htmlFor="signup__passConf">
              Confirm Password <span className="red-text">{this.state.passConfErr}</span>
            </label>
          </div>

        </div>

        <div id="signup__btn" className="section row center">
          <button className="btn waves-effect waves-light" type="submit">
            Sign Up <i className="material-icons right">send</i>
          </button>
        </div>

      </form>
    );
  }
}
