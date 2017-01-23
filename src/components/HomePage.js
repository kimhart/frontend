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
            <h1>Tally</h1>
        );
    }
}

export default HomePage;
