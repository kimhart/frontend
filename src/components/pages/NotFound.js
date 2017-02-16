import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class NotFound extends React.Component {

    render() {
      return (
        <div className="not-found-page">
          <h2>That page doesn't exist.</h2>
          <span className="back">
            <i className="material-icons">arrow_back&nbsp;</i>
            <p><Link to="/">Return to dashboard</Link></p>
          </span>
        </div>
      );
    }
}

export default NotFound;
