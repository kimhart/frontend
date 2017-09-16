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
            this.props.setUser();
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
      const { facebook } = this.props.location.query;
      return (
        <div className="signup-page-wrap">
          <div className="logged-out-header">
            <Link to="/"><TallyLogo /></Link>
          </div>
          <div className="signup-page">
            <h2 className="page-title">Sign Up</h2>
            { !!facebook &&
              <div>
                <h3>Looks like we couldn't find an account after all! Sign up for Tally here!</h3>
                <br />
              </div>
            }
            <form className="signup-form" onChange={this.handleDemographics} onSubmit={ !error ? this.handleSubmit : null }>
              <div className="profile-input-wrap input-label-wrap">
                <input id="email" className="signup-email-input input--outline no-placeholder" type="email" placeholder="Email" ref="emailInput" required />
                <label className="label-input-placeholder" htmlFor="email">Email</label>
              </div>
              <div className="profile-input-wrap input-label-wrap">
                <input id="password" className="signup-password-input input--outline no-placeholder" type="password" placeholder="Password" ref="passwordInput" required />
                <label className="label-input-placeholder" htmlFor="password">Password</label>
              </div>
              <div className="profile-input-wrap input-label-wrap">
                <input id="password-match" className="signup-password-confirm-input input--outline no-placeholder" type="password" placeholder="Confirm Password" ref="passwordConfirm" required />
                <label className="label-input-placeholder" htmlFor="password-match">Confirm Password</label>
              </div>
              <div className="flex-half">
                <div className="profile-input-wrap input-label-wrap">
                  <input id="first-name" className="signup-firstname-input input--outline no-placeholder" type="text" placeholder="First Name" ref="firstNameInput" required />
                  <label className="label-input-placeholder" htmlFor="first-name">First Name</label>
                </div>
                <div className="profile-input-wrap input-label-wrap">
                  <input id="last-name" className="signup-lastname-input input--outline no-placeholder" type="text" placeholder="Last Name" ref="lastNameInput" required />
                  <label className="label-input-placeholder" htmlFor="last-name">Last Name</label>
                </div>
              </div>
              <div className="profile-input-wrap input-label-wrap">
                <select id="party" className="signup-party-input input--outline no-placeholder" ref="partyInput" required>
                  <option value="">Choose a party...</option>
                  <option value="Democrat">Democrat</option>
                  <option value="Republican">Republican</option>
                  <option value="Independent">Independent</option>
                  <option value="Libertarian">Libertarian</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex-half">
                <div className="profile-input-wrap input-label-wrap">
                  <input id="address" className="signup-address-input input--outline no-placeholder" type="text" placeholder="Street Address" ref="streetInput" required />
                  <label className="label-input-placeholder" htmlFor="address">Address</label>
                </div>
                <div className="profile-input-wrap input-label-wrap">
                  <input id="address2" className="signup-address-input input--outline no-placeholder" type="text" placeholder="Apartment" ref="address2Input" />
                  <label className="label-input-placeholder" htmlFor="address2">Apartment</label>
                </div>
              </div>
              <div className="flex-thirds">
                <div className="profile-input-wrap input-label-wrap">
                  <input id="city" className="signup-address-input input--outline no-placeholder" type="text" placeholder="City" ref="cityInput" />
                  <label className="label-input-placeholder" htmlFor="city">City</label>
                </div>
                <div className="profile-input-wrap input-label-wrap">
                  <input id="state" className="signup-address-input input--outline no-placeholder" type="text" placeholder="State" ref="stateInput" />
                  <label className="label-input-placeholder" htmlFor="address">State</label>
                </div>
                <div className="profile-input-wrap input-label-wrap">
                  <input id="zip" className="signup-zip-input input--outline no-placeholder" type="text" placeholder="ZIP Code" ref="zipcodeInput" required />
                  <label className="label-input-placeholder" htmlFor="zip">ZIP Code</label>
                </div>
              </div>
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
