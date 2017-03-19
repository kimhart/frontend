import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Link, browserHistory } from 'react-router';
import Footer from './../Footer';

class Signup extends React.Component {

    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDemographics = this.handleDemographics.bind(this);
      this.handleEmailPassword = this.handleEmailPassword.bind(this);
      this.validatePassword = this.validatePassword.bind(this);
      this.state = {
        user: {
          email: null, 
          password: null,
          first_name: null,
          last_name: null,
          street: null,
          zip_code: null
        },
        error: "",
        passwordsConfirmed: false
      }
    }

    handleEmailPassword = (e) => {
      let email = ReactDOM.findDOMNode(this.refs.emailInput).value;
      let password = ReactDOM.findDOMNode(this.refs.passwordInput).value;

      this.setState({
        user: {
          email: email,
          password: password
        }
      })
    }

    handleDemographics = (e) => {
      let firstName = ReactDOM.findDOMNode(this.refs.firstNameInput).value;
      let lastName = ReactDOM.findDOMNode(this.refs.lastNameInput).value;
      let street = ReactDOM.findDOMNode(this.refs.streetInput).value;
      let zipcode = ReactDOM.findDOMNode(this.refs.zipcodeInput).value;

      this.setState({
        user: {
          email: this.state.user.email,
          password: this.state.user.password,
          first_name: firstName,
          last_name: lastName,
          street: street,
          zip_code: zipcode
        }
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const data = this.state.user;
      console.log(data);
      $.ajax({
        type: 'POST',
        url: 'https://heroku-postgres-7720c2d1.herokuapp.com/new_user',
        data: data,
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Headers': 'x-requested-with',
          'Access-Control-Allow-Origin': '*'
        },
        success: function(response, textStatus, xhr) {
          if (response.results === true) {
            browserHistory.push('/login');
          } else {
            alert("Something went wrong");
          }
        },
        error: function(xhr, textStatus, error) {
          console.log(error);
        }
      })
    }

    validatePassword = (e) => {
      let password = ReactDOM.findDOMNode(this.refs.passwordInput).value;
      let passwordConfirm = ReactDOM.findDOMNode(this.refs.passwordConfirm).value;

      if (password !== passwordConfirm) {
        this.setState({
          error: "Passwords must match."
        })
      } else {
        this.setState({
          passwordsConfirmed: true
        })
      }
    }

 
    render() {

      return (
        <div className="signup-page">
          <div className="form-container">
            <form className="signup-form" onSubmit={this.handleSubmit}>
              {!this.state.passwordsConfirmed &&
              <div className="signup-part-one" onChange={this.handleEmailPassword}>
                <h2 className="page-title">Sign Up</h2>
                <input id="email" type="email" placeholder="Email" ref="emailInput" required  />
                <input id="password" type="password" placeholder="Password" ref="passwordInput" required />
                <input id="password-match" type="password" placeholder="Confirm Password" ref="passwordConfirm" required />
                <p className="error">{this.state.error}</p>
                <button id="progress-signup" onClick={this.validatePassword}>Continue</button>
              </div>
              } 
              {this.state.passwordsConfirmed &&
              <div className="signup-part-two" onChange={this.handleDemographics}>
                <h2 className="page-title">Tell Us About You</h2>
                <input id="first-name" type="text" placeholder="First Name" ref="firstNameInput" required />
                <input id="last-name" type="text" placeholder="Last Name" ref="lastNameInput" required />
                <input id="address" type="text" placeholder="Street Address" ref="streetInput" required />
                <input id="zip" type="text" placeholder="ZIP code" ref="zipcodeInput" required />
                <button className="signup-btn" type="submit">Go!</button>
              </div>
              }
            </form>
          </div>
          <Footer />
        </div>
      );
    }
}

export default Signup;


