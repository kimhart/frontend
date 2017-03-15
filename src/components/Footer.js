import React from 'react';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';


class Footer extends React.Component {

  render() {
    return (
      <footer className="footer">
        <div className="nav active">
          <Link to="/">Reps</Link>
        </div>
        <div className="nav">
          <Link to="#">Ranks</Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
