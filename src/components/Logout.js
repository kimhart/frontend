import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
let localStorageRef = JSON.parse(localStorage.getItem('user'));


class Logout extends React.Component {
    constructor(props) {
      super(props);
      this.handleLogout = this.handleLogout.bind(this);

      if (localStorageRef) {
        this.state = {
          user: localStorageRef,
          isLoggedIn: true
        }
      } else {
        this.state = {
          user: null,
          isLoggedIn: false
        }
      }
    }

    handleLogout() {
      localStorage.removeItem('user');
      this.setState({ 
        user: null,
        isLoggedIn: false
      });
      browserHistory.push('/login');
    }

    render() {
        return (
            <button className="home-button" onClick={this.handleLogout}>Logout</button>
        );
    }
}

export default Logout;
