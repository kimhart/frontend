import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Footer from './Footer';
import Logout from './Logout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserUtils } from '../utils/Utils';

class Template extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: UserUtils.getUser() || null };
  }

  setUser = () => {
    this.setState({ user: UserUtils.getUser() });
  }

  render() {
    const { user } = this.state;
    if (!user) {
      if (this.props.location.pathname === "/signup") {
        return <Signup />
      } return <Login {...this.props} update={this.setUser} />
    } else {
      return (
        <div className="page-wrap">
          { this.props.children }
          <Footer />
        </div>
      );
    }
  }
}

export default Relay.createContainer(Template, {
  initialVariables: {},
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        ${Login.getFragment('data')}
      }
    `
  }
});
