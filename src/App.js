import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Template from './components/Template';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';


let RootQuery = {
  data: (Component) => Relay.QL`
    query RootQuery {
      data {
        ${Component.getFragment('data')}
      }
    }
  `
};

class App extends React.Component {

  render() {
    return (
      <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
        <Route path="/" component={Template} queries={RootQuery}>
          <IndexRoute component={HomePage}/>
          <Route path="login" component={LoginPage}/>
          <Route path="signup" component={SignupPage} />
          <Route path="dashboard" component={DashboardPage} queries={RootQuery} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }

}

export default App;

