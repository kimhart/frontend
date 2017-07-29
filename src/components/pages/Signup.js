import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Link, browserHistory } from 'react-router';
import Footer from '../Footer';
import SignupMutation from '../mutations/SignupMutation';
import { UserUtils } from '../../utils/Utils';
import { TallyLogo } from '../icons/Icons';

class Signup extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        user: {
          email: null,
          password: null,
          first_name: null,
          last_name: null,
          party: null,
          street: null,
          zip_code: null
        },
        error: null,
        passwordsConfirmed: false
      }
    }

    handleDemographics = () => {
      let {
        emailInput: { value: email },
        passwordInput: { value: password },
        firstNameInput: { value: first_name },
        lastNameInput: { value: last_name },
        partyInput: { value: party },
        streetInput: { value: street },
        zipcodeInput: { value: zip_code }
      } = this.refs;
      this.setState({ user: { email, password, first_name, last_name, party, street, zip_code } });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { user } = this.state;
      this.props.relay.commitUpdate(new SignupMutation({ ...user, user: this.props.data.user }), {
        onFailure: (error) => {
          console.error({ file: 'Signup', error });
        },
        onSuccess: ({ Signup: { user } }) => {
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
        passwordConfirm: { value: passwordConfirm }
      } = this.refs;

      if (password !== passwordConfirm) {
        this.setState({ error: "Passwords must match." });
      } else {
        this.setState({
          error: null,
          passwordsConfirmed: true
        });
      }
    }

    render() {
      let { passwordsConfirmed, error } = this.state;
      return (
        <div className="signup-page-wrap">
          <div className="logged-out-header">
            <Link to="/"><TallyLogo /></Link>
          </div>
          <div className="signup-page">
            <form className="signup-form" onChange={this.handleDemographics} onSubmit={ !error ? this.handleSubmit : null }>
              <h2 className="page-title">Sign Up</h2>
              <input id="email" type="email" placeholder="Email" ref="emailInput" required  />
              <input id="password" type="password" placeholder="Password" ref="passwordInput" required />
              <input id="password-match" type="password" placeholder="Confirm Password" ref="passwordConfirm" required />
              <input id="first-name" type="text" placeholder="First Name" ref="firstNameInput" required />
              <input id="last-name" type="text" placeholder="Last Name" ref="lastNameInput" required />
              <select id="party" ref="partyInput" required>
                <option>Democrat</option>
                <option>Republican</option>
                <option>Independent</option>
                <option>Libertarian</option>
                <option>Other</option>
              </select>
              <input id="address" type="text" placeholder="Street Address" ref="streetInput" required />
              <input id="zip" type="text" placeholder="ZIP code" ref="zipcodeInput" required />
              <span className="signup-error-msg">{error ? error : null}</span>
              <button onClick={this.validatePassword} className="signup-btn" type="submit">Go!</button>
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
