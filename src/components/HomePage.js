import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
let userConfig = require('../../utilities/UserConfig.js');


class HomePage extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="home-page">
            <h2 className="page-title">Tally</h2>
            <Link to="/signup"><button className="signup-button">Signup</button></Link>
            <span className="or">—OR—</span>
            <Link to="/login"><button className="home-button">Login</button></Link>
          </div>
        );
    }
}

export default HomePage;
