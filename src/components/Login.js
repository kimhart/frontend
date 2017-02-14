import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
// import LoginMutation from './mutations/LoginMutation';

let localStorageRef = JSON.parse(localStorage.getItem('user'));

class LoginPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null
      }
    }

    handleSubmit = (e) => {
      console.log({ email: this._email.value, password: this._password.value });
      // fetch('http://heroku-postgres-7720c2d1.herokuapp.com/login', {
      //   method: 'POST',
      //   body: {
      //     email: ReactDOM.findDOMNode(this.refs.emailInput).value,
      //     password: ReactDOM.findDOMNode(this.refs.passwordInput).value
      //   }
      // })
      // .then((res) => {
      //   return res.json();
      // })
      // .then((j) => {
      //   if (j.results) {
      //     let currentUser = j.results[0];
      //     this.props.handleLogin(currentUser);
      //   } else {
      //     this.props.handleLogin(null);
      //   }
      // });
    }

    render() {
      let { error } = this.state;
      return (
        <div>
          <div className="login-logout-page">
            <div className="form-container">
              <h2 className="page-title">Log In</h2>
              <div id="login-form" className="login-form">
                <input type="email" placeholder="Email" required ref={(c) => this._email = c} />
                <input type="password" placeholder="Password" required ref={(c) => this._password = c} />
                <button type="button" onClick={this.handleSubmit}>Login</button>
              </div>
            </div>
            { error &&
              <span className="login-page-error">{ error }</span>
            }
          </div>
        </div>
      );
    }
}

export default Relay.createContainer(LoginPage, {
  initialVariables: {},
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});
