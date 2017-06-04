import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class NotFound extends React.Component {

    render() {
      return (
        <div className="not-found-page">
          <h3>That page doesn't exist.</h3>
          <span className="back">
            <p><Link to="/">Return to dashboard</Link></p>
          </span>
        </div>
      );
    }
}

export default NotFound;
