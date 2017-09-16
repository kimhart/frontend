import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import * as firebase from 'firebase';
import Footer from './Footer';
import Header from './Header';
import Logout from './Logout';
import Login from './pages/Login';
import Analyze from './pages/Analyze';
import Signup from './pages/Signup';
import Loading from './loading/Loading';
import AppLoading from './pages/AppLoading';
import IconStates from './icons/IconStates';
import About from './pages/About';
import { UserUtils, isLoading, initLoading } from '../utils/Utils';

// NOTE: refactor this code out
const facebookAuth = new firebase.auth.FacebookAuthProvider();
facebookAuth.addScope('user_location');
firebase.initializeApp({
  apiKey: "AIzaSyD2qIaesYB-4HavqZveObEL13zQX541Xgg",
  authDomain: "tally-auth.firebaseapp.com",
  databaseURL: "https://tally-auth.firebaseio.com",
  projectId: "tally-auth",
  storageBucket: "tally-auth.appspot.com",
  messagingSenderId: "497606623527"
});

class Template extends React.Component {

  constructor(props) {
    super(props);
    let user_id = UserUtils.getUserId();
    props.relay.setVariables({ user_id: UserUtils.isValidUserId(user_id) ? `${user_id}` : null }, ({ done, error, aborted }) => {
      if (done || error || aborted) {
        this.setState({ done: true });
      }
    });
  }

  loginWithFacebook = () => {
    firebase.auth().signInWithRedirect(facebookAuth)
  }

  componentWillUpdate(nextProps, nextState) {
    let { user: previousUser } = this.props.data;
    let { user } = nextProps.data;
    if (!previousUser && user && FS) {
      FS.identify(user.user_id, {
        displayName: `${user.first_name} ${user.last_name}`,
        ...user
      });
    }
  }

  componentDidMount() {
    initLoading(true);
    setTimeout(() => {
      initLoading(false);
    }, 1000);
  }

  setUser = () => {
    let user_id = UserUtils.getUserId();
    this.props.relay.setVariables({ user_id: UserUtils.isValidUserId(user_id) ? `${user_id}` : null }, ({ done, error, aborted }) => {
      if (done || error || aborted) {
        this.setState({ done: !this.state.done });
      }
    });
  }

  logOut = () => {
    UserUtils.logOut();
    this.props.relay.setVariables({ user_id: null });
    browserHistory.push('/');
  }

  render() {
    let { user } = this.props.data;
    if (user && user.user_id === "null" && !UserUtils.isValidUserId(UserUtils.getUserId())) {
      user = null;
    }
    if (false) {
      if (this.props.location.pathname === "/signup") {
        return <Signup {...this.props} update={this.setUser} />
      }
      else if (this.props.location.pathname === "/about/" || this.props.location.pathname === "/about") {
        return (
          <div className="page-wrap">
            <Header />
            <About {...this.props} />
          </div>
        )
      }
      else {
        return (
          <div className="page-wrap">
            <AppLoading />
            <Login {...this.props}
              update={this.setUser}
              loginWithFacebook={this.loginWithFacebook}
            />
          </div>
        );
      }
    } else {
      const childrenWithUser = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          user,
          logOut: () => this.logOut(),
          setUser: () => this.setUser(),
          loginWithFacebook: () => this.loginWithFacebook()
        })
      });
      return (
        <div className="page-wrap">
          <IconStates />
          <Loading />
          <Footer placement="top" update={this.setUser} user={user} />
          { childrenWithUser }
          <Footer placement="bottom" update={this.setUser} user={user} />
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
