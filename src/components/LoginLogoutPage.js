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

class LoginLogoutPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div/>
      );
    }
}
