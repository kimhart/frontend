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
            UserUtils.setUserId(user.user_id);
            this.props.update();
          }
        }
      });
    }

    render() {
      let { error } = this.state;
      return (
        <div className="home-page-wrap">
          <h2 className="page-title">Tally</h2>
          <section className="home-section home-login">
            <div id="login-form" className="login-form">
              <input type="email" placeholder="Email" required ref={(c) => this._email = c} />
              <input type="password" placeholder="Password" required ref={(c) => this._password = c} />
              <button className="login-btn" type="button" onClick={this._handleSubmit}>Login</button>
            </div>
            { error && <p className="error">{ error }</p> }
            <p className="create-account">New here? Create an <Link className="standard-link signup-link" to="/signup">account</Link>.</p>
          </section>
          <section className="home-section home-about">
            <div className="home-about-content">
              <h3>About</h3>
              <p>2018 midterm elections are around the corner. Do your Senators & Congresspeople deserve your vote?</p>
              <p>We've gathered and scored your reps' attendance, sponsored legislation, voting record, and ideology trends — dating all the way back to 1989.</p> 
              <p>Tally is journalism-free, so you can spend less time sifting through headlines and focus on metrics that matter.</p>
            </div>
          </section>
          <section className="home-section home-team">
            <div className="home-team-content">
              <h3>The Team</h3>
              <p>Tally was built by a scrappy team in New York City with a shared passion for politics and data. Our backgrounds span political science, journalism, computer science and design.</p>
              <div className="team-list">
                <p>Alex Hubbard</p>
                <span className="team-title">Founder, Data Scientist</span>
                <p>Kim Hart</p>
                <span className="team-title">Co-Founder, Front End Engineer</span>
                <p>Ryano Taylor</p>
                <span className="team-title">Front End Engineer</span>
                <p>Mattan Ingram</p>
                <span className="team-title">Product Designer</span>
                <p>Jesse Smith</p>
                <span className="team-title">UX Designer</span>
              </div>
            </div>
          </section>
          <section className="home-section home-mission">
            <div className="home-mission-content">
              <h3>Mission</h3>
              <p>Tally aims to provide all people with a simple and fresh way to connect with their elected officials and review legislation that affects their district.</p>
              <p>Our data is directly collected from public records on <a className="gov-sites" target="_blank" href="https://congress.gov/">Congress.gov</a> and <a className="gov-sites" target="_blank" href="https://www.senate.gov/">Senate.gov</a>. We are not affiliated with a specific party and place utmost importance on remaining impartial in our data collection and scoring algorithms. Through this presentation of unbiased data, we hope to encourage confidence in voters and accountability in representatives.</p>
             </div>
          </section>
          <section className="home-section home-contact">
            <div className="home-contact-content">
              <h3>Contact Us</h3>
              <p>Want to learn more about what we're building? Get in touch:</p>
              <p>Alex Hubbard: <span className="email">alex(at)tally.us.com</span></p>
              <p>Kim Hart: <span className="email">kim(at)tally.us.com</span></p>
             </div>
          </section>
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
