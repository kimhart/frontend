import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {Dashboard} from './DashboardPage';


class NotFound extends React.Component {

    render() {
      return (
        <div className="not-found-page">
          <Row>
            <Col md={12}>
              <h2>Whoops!<br/> That page doesn't exist.</h2>
              <span className="back">
                <i className="material-icons">arrow_back&nbsp;</i>
                <p><Link to="/dashboard">Return to dashboard</Link></p>
              </span>
            </Col>
          </Row>
        </div>
      );
    }
}

export default NotFound;

