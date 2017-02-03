import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import useRelay from 'react-router-relay';
import LoginPage from './LoginLogoutPage';
import Footer from './Footer';
import Logout from './Logout';
import LoginLogoutPage from './LoginLogoutPage';
import { UserUtils } from '../utils/Utils';

class Template extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: UserUtils.getUser() || null };
  }

  componentWillUpdate(nextProps, nextState) {
    let user = UserUtils.getUser();
    let { user: prevUser } = this.state;
    if (user && !prevUser) {
      Object.assign(nextState, { user });
    }
  }

  render() {
    const { user } = this.state;
    if (!user) {
      return <LoginLogoutPage {...this.props} />
      return (
        <div className="home-page">
          <h2 className="page-title">Tally</h2>
          <Link to="/signup">
            <button className="signup-button">Signup</button>
          </Link>
          <span className="or">—OR—</span>
          <Link to="/login">
            <button className="home-button">Login</button>
          </Link>
        </div>
      )
    }
    return (
      <Grid fluid={true} className="page-wrap">
        <div className="page-content">
          { this.props.children }
        </div>
      </Grid>
    );
  }
}

export default Relay.createContainer(Template, {
  initialVariables: {},
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});
