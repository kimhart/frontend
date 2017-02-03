import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

let localStorageRef = JSON.parse(localStorage.getItem('user'));

class LoginPage extends React.Component {

    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      fetch('http://heroku-postgres-7720c2d1.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify({
          email: ReactDOM.findDOMNode(this.refs.emailInput).value,
          password: ReactDOM.findDOMNode(this.refs.passwordInput).value
        })
      })
      .then((res) => {
        return res.json();
      })
      .then((j) => {
        if (j.results) {
          let currentUser = j.results[0];
          this.props.handleLogin(currentUser);
          browserHistory.push({ pathname: 'dashboard' });
        } else {
          this.props.handleLogin(null);
        }
      });
    }

    render() {
      return (
        <div className="form-container">
          <h2 className="page-title">Log In</h2>
          <form id="login-form" className="login-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl type="email" placeholder="Email" ref="emailInput" required />
              <FormControl type="password" placeholder="Password" ref="passwordInput" required />
              <button type="submit">Go!</button>
            </FormGroup>
          </form>
        </div>
      );
    }
}

export default LoginPage;
