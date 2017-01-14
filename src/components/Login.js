import React from 'react';
import Relay from 'react-relay';

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
      this.setState({
        email: this.refs.emailInput.value,
        password: this.refs.passwordInput.value
      })
    }

    handleSubmit(event) {
      event.preventDefault();

      let userData = this.state;

      $.ajax({
        type: 'POST',
        url: 'http://heroku-postgres-7720c2d1.herokuapp.com/login',
        data: userData
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
        <div className="row">
          <div className="col-md-12">
            <div className="form-container">
              <h2 className="page-title">Log In Now</h2>
              <form className="login-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <input type="email" placeholder="Email" ref="emailInput" />
                <input type="password" placeholder="Password" ref="passwordInput" />
                <button type="submit">Log In</button>
              </form>
            </div>
          </div>
        </div>
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

