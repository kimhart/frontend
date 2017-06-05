import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Link, browserHistory } from 'react-router';
import Footer from '../Footer';
import SignupMutation from '../mutations/SignupMutation';
import { UserUtils } from '../../utils/Utils';

class Signup extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        user: {
          email: null,
          password: null,
          first_name: null,
          last_name: null,
          street: null,
          zip_code: null
        },
        error: null,
        passwordsConfirmed: false
      }
    }

    handleEmailPassword = () => {
      let {
        emailInput: { value: email },
        passwordInput: { value: password }
      } = this.refs;
      this.setState({ user: { email, password } });
    }

    handleDemographics = () => {
      let { email, password } = this.state.user;
      let {
        firstNameInput: { value: first_name },
        lastNameInput: { value: last_name },
        streetInput: { value: street },
        zipcodeInput: { value: zip_code }
      } = this.refs;
      this.setState({ user: { email, password, first_name, last_name, street, zip_code } });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { user } = this.state;
      this.props.relay.commitUpdate(new SignupMutation({ ...user, user: this.props.data.user }), {
        onFailure: (error) => {
          console.error({ file: 'Signup', error });
        },
        onSuccess: ({ Signup: { user } }) => {
          console.log({ user });
          if (typeof user === 'object' && user.hasOwnProperty('user_id') && !!user.user_id) {
            UserUtils.setUserId(user.user_id);
            this.props.update();
            browserHistory.push('/');
          }
          else {
            this.setState({ error: user.error });
          }
        }
      });
    }

    validatePassword = () => {
      let {
        passwordInput: { value: password },
        passwordConfirm: { value: passwordConfirm },
      } = this.refs;

      if (password !== passwordConfirm) {
        this.setState({ error: "Passwords must match." });
      } else {
        this.setState({ passwordsConfirmed: true });
      }
    }

    render() {
      let { passwordsConfirmed, error } = this.state;
      return (
        <div className="signup-page-wrap">
          <Link to="/">Home</Link>
          <div className="signup-page">
            <form className="signup-form" onSubmit={this.handleSubmit}>
              <p className="error">{error}</p>
              { !passwordsConfirmed &&
                <div className="signup-part-one" onChange={this.handleEmailPassword}>
                  <h2 className="page-title">Sign Up</h2>
                  <input id="email" type="email" placeholder="Email" ref="emailInput" required  />
                  <input id="password" type="password" placeholder="Password" ref="passwordInput" required />
                  <input id="password-match" type="password" placeholder="Confirm Password" ref="passwordConfirm" required />
                  <span className="signup-error-msg">{error}</span>
                  <button id="progress-signup" onClick={this.validatePassword}>Continue</button>
                </div>
              }
              { passwordsConfirmed &&
                <div className="signup-part-two" onChange={this.handleDemographics}>
                  <h2 className="page-title">Tell Us About You</h2>
                  <h3 className="signup-help-us">and help us find your district</h3>
                  <input id="first-name" type="text" placeholder="First Name" ref="firstNameInput" required />
                  <input id="last-name" type="text" placeholder="Last Name" ref="lastNameInput" required />
                  <input id="address" type="text" placeholder="Street Address" ref="streetInput" required />
                  <input id="zip" type="text" placeholder="ZIP code" ref="zipcodeInput" required />
                  <button className="signup-btn" type="submit">Go!</button>
                </div>
              }
            </form>
          </div>
        </div>
      );
    }
}

export default Relay.createContainer(Signup, {
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        user {
          user_id
          error
          ${SignupMutation.getFragment('user')}
        }
      }
    `
  }
});
