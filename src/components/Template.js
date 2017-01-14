import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';


class Template extends React.Component {

  render() {
    return (
      <div className="container-fluid"> 
        <div>
         {/* Header would go here on desktop version */} 
        </div>
        <div className="page-content">
          { this.props.children }
        </div>
        <div className="footer">
          <div className="navbar row">
            <ul className="nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Template, {
  initialVariables: {},
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});
