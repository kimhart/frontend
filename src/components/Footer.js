import React from 'react';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import { UserUtils } from '../utils/Utils';
import Scroll from 'react-scroll';
import IconReps from './icons/IconReps';
import IconRank from './icons/IconRank';
import IconAnalyze from './icons/IconAnalyze';
import IconSearch from './icons/IconSearch';
const scroll = Scroll.animateScroll;

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

  scrollToTop = () => {
    scroll.scrollToTop();
  }

  render() {
    return (
      <nav className="nav-bar">
        <Link to="/" className={`nav-bar-tab ${!this.getActiveTab() ? ' active' : ''}`}>
          <span className="nav-bar-tab_icon">
            <IconReps fill="black" />
          </span>
          <span className="nav-bar-tab_title">Reps</span>
        </Link>
        <Link to="/rank" className={`nav-bar-tab ${this.getActiveTab() === 'rank' ? ' active' : ''}`} onClick={this.scrollToTop()}>
          <span className="nav-bar-tab_icon">
            <IconRank fill="black" />
          </span>
          <span className="nav-bar-tab_title" onClick={this.scrollToTop()}>Rank</span>
        </Link>
        <Link to="/" className={`nav-bar-tab ${this.getActiveTab() === 'analyze' ? ' active' : ''}`}>
          <span className="nav-bar-tab_icon">
            <IconAnalyze fill="black" />
          </span>
          <span className="nav-bar-tab_title">Analyze</span>
        </Link>
        <Link to="/search" className={`nav-bar-tab ${this.getActiveTab() === 'search' ? ' active' : ''}`}>
          <span className="nav-bar-tab_icon">
            <IconSearch fill="black" />
          </span>
          <span className="nav-bar-tab_title">Search</span>
        </Link>
        <Link to="/" className={`nav-bar-tab ${this.getActiveTab() === 'logout' ? ' active' : ''}`} onClick={() => this.logOut()}>
          <span className="nav-bar-tab_title" style={{ pointerEvents: 'none' }}>Logout</span>
        </Link>
      </nav>
    );
  }
}

export default Footer;
