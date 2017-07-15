import React from 'react';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import { UserUtils } from '../utils/Utils';
import Scroll from 'react-scroll';
import { IconReps, IconRank, IconAnalyze, IconSearch, TallyLogo, IconSettings } from './icons/Icons';
const scroll = Scroll.animateScroll;

class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  getActiveTab = (tab) => {
    if (location.href.includes('search')) return 'search';
    if (location.href.includes('rank')) return 'rank';
    if (location.href.includes('explore')) return 'explore';
    if (location.href.includes('analyze')) return 'analyze';
    if (location.href.includes('settings')) return 'settings';
    return false;
  }

  logOut = () => {
    UserUtils.logOut();
    this.props.update();
  }

  // scrollToTop = () => {
  //   scroll.scrollToTop();
  // }

  render() {
    let { placement } = this.props;
    return (
      <nav className={`nav-bar nav-bar--${placement}`}>
        {placement === 'top' &&
          <Link to="/" className="nav-logo">
            <TallyLogo /><span className="logo-text">Tally</span>
          </Link>
        }
        <div className="main-tabs">
          <Link to="/" className={`nav-bar-tab ${!this.getActiveTab() ? ' active' : ''}`}>
            <span className="nav-bar-tab_icon">
              <IconReps fill="black" />
            </span>
            <span className="nav-bar-tab_title">Reps</span>
          </Link>
          <Link to="/rank" className={`nav-bar-tab ${this.getActiveTab() === 'rank' ? ' active' : ''}`}>
            <span className="nav-bar-tab_icon">
              <IconRank fill="black" />
            </span>
            <span className="nav-bar-tab_title">Rank</span>
          </Link>
          {/* <Link to="/analyze" className={`nav-bar-tab ${this.getActiveTab() === 'analyze' ? ' active' : ''}`}>
            <span className="nav-bar-tab_icon">
              <IconAnalyze fill="black" />
            </span>
            <span className="nav-bar-tab_title">Analyze</span>
          </Link> */}
          <Link to="/search" className={`nav-bar-tab ${this.getActiveTab() === 'search' ? ' active' : ''}`}>
            <span className="nav-bar-tab_icon">
              <IconSearch fill="black" />
            </span>
            <span className="nav-bar-tab_title">Search</span>
          </Link>
          <Link to="/settings" className={`settings nav-bar-tab ${this.getActiveTab() === 'settings' ? ' active' : ''}`}>
            <span className="nav-bar-tab_icon">
              <IconSettings />
            </span>
            <span className="nav-bar-tab_title">Settings</span>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Footer;
