import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DashboardPage from './DashboardPage';
import Footer from './Footer';


class LoginPage extends React.Component {

    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        user: null
      }
    }

    handleSubmit(event) {
      event.preventDefault();
      let that = this;

      fetch('http://heroku-postgres-7720c2d1.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify({
          email: ReactDOM.findDOMNode(this.refs.emailInput).value,
          password: ReactDOM.findDOMNode(this.refs.passwordInput).value
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(j) {
        if (j.results) {
          let currentUser = j.results[0];
          localStorage.setItem('user', JSON.stringify(currentUser));
          that.setState({
            user: currentUser
          })
          browserHistory.push('/dashboard');
        } else {
          alert('Wrong username or password');
        }
      });
    }

    render() {

      return (
        <div>
          <Row>
            <Col md={12} className="login-page">
              <h2 className="page-title">Log In</h2>
              <div className="form-container">
                <form id="login-form" className="login-form" onSubmit={this.handleSubmit}>
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
