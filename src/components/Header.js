import React from 'react';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import { UserUtils } from '../utils/Utils';
import TallyLogo from './icons/TallyLogo';

class Header extends React.PureComponent {

  render() {
    return (
      <header className="logo">
        <div className="logo-container">
          <Link to="/">
            <TallyLogo />
            <span className="tally-logo-helper">Tally</span>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
