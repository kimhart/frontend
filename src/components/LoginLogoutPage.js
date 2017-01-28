import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DashboardPage from './DashboardPage';
import Footer from './Footer';
import Login from './Login';
import Logout from './Logout';

let localStorageRef = JSON.parse(localStorage.getItem('user'));

class LoginLogoutPage extends React.Component {

    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);

      if (localStorageRef) {
        this.state = {
          isLoggedIn: true,
          user: localStorageRef
        }
      } else {
        this.state = {
          isLoggedIn: false,
          user: null
        }
      } 
    }

    handleLogin(props) {
      localStorage.setItem('user', JSON.stringify(props));
      this.setState({ 
        user: localStorageRef,
        isLoggedIn: true 
      });
    }


    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let userAction = null;
      if (isLoggedIn) {
        userAction = <Logout handleLogout={this.handleLogout} />;
      } else {
        userAction = <Login handleLogin={this.handleLogin} />;
      };

      return (
        <div>
          <Row>
            <Col md={12} className="login-logout-page">
              {userAction}
            </Col>
          </Row>
        </div>
      );
    }
}

export default LoginLogoutPage;
