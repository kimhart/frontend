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
          <Link className="standard-link" to="/"><h2 className="page-title">Tally</h2></Link>
          <section className="home-section home-login">
            <div id="login-form" className="login-form">
              <input type="email" placeholder="Email" required ref={(c) => this._email = c} />
              <input type="password" placeholder="Password" required ref={(c) => this._password = c} />
              <button className="login-btn" type="button" onClick={this._handleSubmit}>Login</button>
            </div>
            { error && <p className="error">{ error }</p> }
            <p className="create-account">New here? Create an <Link className="standard-link signup-link" to="/signup">account</Link>.</p>
          </section>
          <section className="home-section home-about section-white section-arrow">
            <div className="home-section-content">
              <h3 className="home-section-title">About</h3>
              <p>It has become more important than ever to hold our legislators accountable. Do your current reps deserve your vote in the 2018 midterms?</p><br/>
              <p>Using public data reaching back nearly three decades—1989 through today—we combined stats about your reps' attendance, voting participation and bill sponsorship into a letter grade to guage their job performance at the most basic level. Tally helps you learn about your reps' top issues & ideologies, and allows you to compare them to other lawmakers in both the Senate and House in every district across the country.</p><br/>
              <p>Upcoming features include a breakdown of campaign finances and donor information, and a daily analysis of the transcripts from each session (outlining highly-discussed topics and what your rep had to say on the floor that day.)</p><br/>
              <p>Unlike other political apps, Tally is journalism-free, so you can spend less time sifting through headlines and focus on metrics that matter.</p>
              <Link className="standard-link" to="/about-metrics">
                <p>Learn More</p>
              </Link>
            </div>
          </section>
          <section className="home-section home-team section-arrow">
            <div className="home-section-content">
              <h3 className="home-section-title">The Team</h3>
              <p>Tally was built by a small team in New York City with a shared passion for politics and data. Our backgrounds span political science, journalism, computer science, product design, and mathematics.</p>
              <ul className="team-list">
                <li className="team-list-item">
                  <span className="team-name">Alex Hubbard</span>
                  <span className="team-title">Founder, Data Scientist</span>
                </li>
                <li className="team-list-item">
                  <span className="team-name">Kim Hart</span>
                  <span className="team-title">Co-Founder, Front End Engineer</span>
                </li>
                <li className="team-list-item">
                  <span className="team-name">Ryan Taylor</span>
                  <span className="team-title">Front End Engineer</span>
                </li>
                <li className="team-list-item">
                  <span className="team-name">Mattan Ingram</span>
                  <span className="team-title">Product Designer</span>
                </li>
                <li className="team-list-item">
                  <span className="team-name">Lilliana Nishihira</span>
                  <span className="team-title">Data Analyst</span>
                </li>
              </ul>
            </div>
          </section>
          <section className="home-section home-mission section-white section-arrow">
            <div className="home-section-content">
              <h3 className="home-section-title">Mission</h3>
              <p>Tally provides all people with a simple and fresh way to connect with their elected officials and review legislation that affects their district.</p><br/>
              <p>Our data is directly collected from public records on <a className="gov-sites" target="_blank" href="https://congress.gov/">Congress.gov</a> and <a className="gov-sites" target="_blank" href="https://www.senate.gov/">Senate.gov</a>. We are not affiliated with a specific party and place utmost importance on remaining impartial in our data collection and scoring algorithms. Through this presentation of unbiased data, we hope to encourage confidence in voters and accountability in representatives.</p>
             </div>
          </section>
          <section className="home-section home-contact">
            <div className="home-section-content">
              <h3 className="home-section-title">Contact Us</h3>
              <p>Want to learn more about what we're building?<br/> Get in touch:</p><br/>
              <p>Alex Hubbard: <span className="home-contact-email">alex@tally.us.com</span></p>
              <p>Kim Hart: <span className="home-contact-email">kim@tally.us.com</span></p>
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
