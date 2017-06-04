import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Footer from './Footer';
import Header from './Header';
import Logout from './Logout';
import Login from './pages/Login';
import Analyze from './pages/Analyze';
import Signup from './pages/Signup';
import Loading from './loading/Loading';
import IconStates from './icons/IconStates';
import { UserUtils } from '../utils/Utils';

class Template extends React.Component {

  constructor(props) {
    super(props);
    let user_id = UserUtils.getUserId();
    props.relay.setVariables({ user_id: this.isValidUserId(user_id) ? `${user_id}` : null }, ({ done, error, aborted }) => {
      if (done || error || aborted) {
        this.setState({ done: true });
      }
    });
  }

  isValidUserId = (user_id) => {
    return !!user_id || user_id === 0;
  }

  setUser = () => {
    let user_id = UserUtils.getUserId();
    this.props.relay.setVariables({ user_id: this.isValidUserId(user_id) ? `${user_id}` : null }, ({ done, error, aborted }) => {
      if (done || error || aborted) {
        this.setState({ done: !this.state.done });
      }
    });
  }

  logOut = () => {
    UserUtils.logOut();
    this.props.relay.setVariables({ user_id: null });
  }

  render() {
    let { user } = this.props.data;
    if (user && user.user_id === "null" && !this.isValidUserId(UserUtils.getUserId())) {
      user = null;
    }
    if (!user) {
      if (this.props.location.pathname === "/signup") {
        return <Signup {...this.props} update={() => this.setUser()} />
      } return <Login {...this.props} update={() => this.setUser()} />
    } else {
      const childrenWithUser = React.Children.map(this.props.children, (child) => React.cloneElement(child, { user, logOut: () => this.logOut() }));
      return (
        <div className="page-wrap">
          <IconStates />
          <Loading />
          <Footer placement="top" update={() => this.setUser()} />
          { childrenWithUser }
          <Footer placement="bottom" update={() => this.setUser()} />
        </div>
      );
    }
  }
}

export default Relay.createContainer(Template, {
  initialVariables: {
    user_id: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        user(user_id: $user_id) {
          city
          district
          first_name
          last_name
          state_long
          state_short
          user_id
          error
        }
        ${Login.getFragment('data')}
        ${Signup.getFragment('data')}
      }
    `
  }
});
