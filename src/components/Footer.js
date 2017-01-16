import React from 'react';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';


class Footer extends React.Component {

  render() {
    return (
     <footer className="footer">
        <div className="scroll-fade"></div>
        <div className="scroll-buffer"></div>
        <div className="navbar row">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;





