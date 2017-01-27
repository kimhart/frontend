import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

let localStorageRef = JSON.parse(localStorage.getItem('user'));

class HomePage extends Component {

    constructor(props) {
      super(props);
      this.handleLogout = this.handleLogout.bind(this);
      this.state = {
        user: localStorageRef
      }
    }

    handleLogout() {
      localStorage.removeItem('user');
      this.setState({
        user: null
      })
    }

    render() {
      if (this.state.user) {
        return (
          <div className="home-page">
            <h2 className="page-title">You're logged in as { this.state.user.first_name }.</h2>
            <button className="home-button" onClick={this.handleLogout}>Logout</button>
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
