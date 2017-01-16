import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Clearfix, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


class Login extends React.Component {

    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        email: null, 
        password: null
      }
    }

    handleChange(event) {
      let email = ReactDOM.findDOMNode(this.refs.emailInput).value;
      let password = ReactDOM.findDOMNode(this.refs.passwordInput).value;

      this.setState({
        email: email,
        password: password
      })
    }

    handleSubmit(event) {
      event.preventDefault();

      let userData = this.state;

      $.ajax({
        type: 'POST',
        url: 'http://heroku-postgres-7720c2d1.herokuapp.com/login',
        data: userData,
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Headers': 'x-requested-with',
          'Access-Control-Allow-Origin': '*'
        },
      })
      .done(function(userData) {
        console.log(userData);
      })
      .fail(function() {
        console.log('failed');
      })
    }

    render() {
      return (
        <Row>
          <Col md={12} className="login-page">
            <h2 className="page-title">Log In</h2>
            <div className="form-container">
              <form className="login-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl type="email" placeholder="Email" ref="emailInput" required />
                  <FormControl type="password" placeholder="Password" ref="passwordInput" required />
                  <button type="submit">Go!</button>
                </FormGroup>
              </form>
            </div>
          </Col>
        </Row>
      );
    }
}

export default Relay.createContainer(Login, {
  initialVariables: {},
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});

