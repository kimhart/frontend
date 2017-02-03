import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DashboardPage from './DashboardPage';
import Footer from './Footer';
import Login from './Login';
import Logout from './Logout';
import { UserUtils } from '../utils/Utils';

let localStorageRef = JSON.parse(localStorage.getItem('user'));

class LoginLogoutPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    handleLogin = (user) => {
      if (!user) {
        this.setState({ error: 'Please check your username and password.' });
      }
      else {
        UserUtils.setUser(user);
      }
    }

    render() {
      let { error } = this.state;
      return (
        <div>
          <Row>
            <Col md={12} className="login-logout-page">
              <Login handleLogin={this.handleLogin} />
              { error &&
                <span className="login-page-error">{ error }</span>
              }
            </Col>
          </Row>
        </div>
      );
    }
}

export default LoginLogoutPage;
