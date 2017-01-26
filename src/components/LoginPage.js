import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DashboardPage from './DashboardPage';
import Footer from './Footer';

let userConfig = require('../../utilities/UserConfig.js').userConfig;

class LoginPage extends React.Component {

    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        email: null, 
        password: null
      }
    }

    handleChange(event) {
      let email = ReactDOM.findDOMNode(this.refs.emailInput).value;
      let password = ReactDOM.findDOMNode(this.refs.passwordInput).value;
      this.setState({
        email: email,
        password: password
      })
    }

    handleSubmit(event) {
      event.preventDefault();

      let userData = this.state;

      $.ajax({
        type: 'POST',
        url: 'http://heroku-postgres-7720c2d1.herokuapp.com/login',
        data: userData,
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Headers': 'x-requested-with',
          'Access-Control-Allow-Origin': '*'
        },
      })
      .done(function(userData) {
        if (userData.results) {
          userConfig = userData.results[0];
          console.log(userConfig);
          browserHistory.push('/dashboard');
        } else {
          alert('Wrong username or password');
        }
      })
      .fail(function() {
        console.log('Failed');
      })
    }

    render() {
      return (
        <div>
          <Row>
            <Col md={12} className="login-page">
              <h2 className="page-title">Log In</h2>
              <div className="form-container">
                <form className="login-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <FormControl type="email" placeholder="Email" ref="emailInput" required />
                    <FormControl type="password" placeholder="Password" ref="passwordInput" required />
                      <button type="submit">Go!</button>
                  </FormGroup>
                </form>
              </div>
            </Col>
          </Row>
          <Footer />
        </div>
      );
    }
}

export default LoginPage;

