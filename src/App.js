import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Template from './components/Template';
import Dashboard from './components/pages/Dashboard';
import Signup from './components/pages/Signup';
import RepBio from './components/pages/RepBio';
import Rank from './components/pages/Rank';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import Analyze from './components/pages/Analyze';
import Search from './components/search/Search';
import About from './components/pages/About';
import AppLoading from './components/pages/AppLoading';
import Settings from './components/pages/Settings';

let RootQuery = {
  data: (Component) => Relay.QL`
    query RootQuery {
      data {
        ${Component.getFragment('data')}
      }
    }
  `
};

if (process.env.NODE_ENV !== "production") {
  window["_fs_ready"] = function() { FS.disableConsole(); }
}

class App extends React.Component {

  render() {
    return (
      <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
        <Route path="/" component={Template} queries={RootQuery}>
          <IndexRoute component={Dashboard} queries={RootQuery} />
          <Route path="/bios/:bioguide_id" component={RepBio} queries={RootQuery} />
          <Route path="/rank" component={Rank} queries={RootQuery} />
          <Route path="/signup" component={Signup} queries={RootQuery} />
          <Route path="/login" component={Login} queries={RootQuery} />
          <Route path="/search" component={Search} queries={RootQuery} />
          <Route path="/analyze" component={Analyze} />
          <Route path="/about" component={About} />
          <Route path="/settings" component={Settings} queries={RootQuery} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }

}

export default App;
