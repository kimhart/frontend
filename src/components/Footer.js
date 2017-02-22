import React from 'react';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';


class Footer extends React.Component {

  render() {
    return (
     <footer className="footer">
        <div className="navbar row">
          <ul className="nav-list">
            <li><Link to="/"><i className="material-icons">home</i></Link></li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;





