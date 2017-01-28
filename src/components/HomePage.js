import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import Logout from './Logout';
let localStorageRef = JSON.parse(localStorage.getItem('user'));


class HomePage extends Component {
    constructor(props) {
      super(props);
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

    render() {
      const isLoggedIn = this.state.isLoggedIn;
      if (isLoggedIn) {
        return (
          <div className="home-page">
            <h2 className="page-title">You're logged in as <br/> { this.state.user.first_name }</h2>
            <Logout />
          </div>
        )
      }
      return (
        <div className="home-page">
          <h2 className="page-title">Tally</h2>
          <Link to="/signup"><button className="signup-button">Signup</button></Link>
          <span className="or">—OR—</span>
          <Link to="/login"><button className="home-button">Login</button></Link>
        </div>
      );
    }
}

export default HomePage;
