import React from 'react';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import { UserUtils } from '../utils/Utils';

class Footer extends React.Component {

  getActiveTab = (tab) => {
    if (location.href.includes('search')) return 'search';
    if (location.href.includes('rank')) return 'rank';
    if (location.href.includes('explore')) return 'explore';
    return false;
  }

  logOut = () => {
    UserUtils.logOut();
    this.props.update();
  }

  render() {
    return (
      <footer className="footer">
        <div className={`footer-nav ${!this.getActiveTab() ? ' active' : ''}`}>
          <Link to="/">Reps</Link>
        </div>
        <div className={`footer-nav ${this.getActiveTab() === 'rank' ? ' active' : ''}`}>
          <Link to="/rank">Rank</Link>
        </div>
        <div className={`footer-nav ${this.getActiveTab() === 'analyze' ? ' active' : ''}`}>
          <Link to="/">Analyze</Link>
        </div>
        <div className={`footer-nav ${this.getActiveTab() === 'search' ? ' active' : ''}`}>
          <Link to="/search">Search</Link>
        </div>
        <div className={`footer-nav ${this.getActiveTab() === 'logout' ? ' active' : ''}`} onClick={() => this.logOut()}>
          <Link to="/" style={{ pointerEvents: 'none' }}>Logout</Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
