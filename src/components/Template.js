import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import Footer from './Footer';
import useRelay from 'react-router-relay';


class Template extends React.Component {

  render() {
    return (
      <Grid fluid={true} className="page-wrap"> 
        <div className="page-content">
          { this.props.children }
        </div>
        <Footer/>
      </Grid>
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
