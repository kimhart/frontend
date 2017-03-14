import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import LoginMutation from './../mutations/LoginMutation';
import { UserUtils } from '../../utils/Utils';
import Signup from './Signup';

class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null
      }
    }

    componentWillMount() {
      window.addEventListener('keypress', this._handleEnter, false);
    }

    componentWillUnmount() {
      window.removeEventListener('keypress', this._handleEnter, false);
    }

    _handleEnter = (e) => {
      if (e.keyCode == 13) this._handleSubmit();
    }

    _handleSubmit = (e) => {
      this.props.relay.commitUpdate(new LoginMutation({ user: this.props.data.user, email: this._email.value, password: this._password.value }), {
        onFailure: (error) => {
          console.error({ file: 'Login', error });
        },
        onSuccess: ({ Login: { user } }) => {
          if (user.error) {
            this.setState({
              error: user.error
            })
          }
          else {
            UserUtils.setUser(user);
            this.props.update();
          }
        }
      });
    }

    render() {
      let { error } = this.state;
      return (
        <div>
          <div className="login-page">
            <div className="form-container">
              <h2 className="page-title">Log In</h2>
              <div id="login-form" className="login-form">
                <input type="email" placeholder="Email" required ref={(c) => this._email = c} />
                <input type="password" placeholder="Password" required ref={(c) => this._password = c} />
                <button type="button" onClick={this._handleSubmit}>Login</button>
              </div>
              { error &&
                <p className="error">{ error }</p>
              }
              <Link className="standard-link" to="/signup">Create an Account</Link>
            </div>
          </div>
        </div>
      );
    }
}

export default Relay.createContainer(Login, {
  initialVariables: {
    email: null,
    password: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        user {
          city
          district
          first_name
          last_name
          state_long
          state_short
          user_id
          error
          ${LoginMutation.getFragment('user')}
        }
      }
    `
  }
});
