import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { Link, browserHistory } from 'react-router';
import LoginMutation from './../mutations/LoginMutation';
import Signup from './Signup';
import { TallyLogo, IconFacebookOfficial } from '../icons/Icons';
import { UserUtils, isLoading, initLoading } from '../../utils/Utils';

class SocialConfirmation extends React.Component {

    componentDidMount() {
      firebase.auth().getRedirectResult().then(result => {
        let facebook_token = null;
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          facebook_token = result.credential.accessToken;
        }
        if (result && result.additionalUserInfo) {
          const { email } = result.additionalUserInfo.profile;
          this.logUserIn({ email, social: 'facebook' })
        }
      }).catch(error => {
        console.error(error);
        browserHistory.push('/login');
      });
    }

    logUserIn = ({ email, social }) => {
      this.props.relay.commitUpdate(new LoginMutation({ user: this.props.data.user, email, password: '', social }), {
        onFailure: (error) => {
          console.error({ file: 'Login', error });
          browserHistory.push('/signup?facebook=error')
        },
        onSuccess: ({ Login: { user } }) => {
          if (user.error) {
            console.log(user.error);
            browserHistory.push('/login')
          }
          else {
            UserUtils.setUserId(user.user_id);
            this.props.setUser();
            browserHistory.push('/');
          }
        }
      });
    }

    render() {
      return (
        <div className="home-page-wrap">
          <div className="login-logo-wrap">
            <TallyLogo /><span className="tally-title">Tally</span>
          </div>
          <section className="home-section home-login">
            <div className="home-section-content">
              <h3 className="home-section-title">Please Wait!</h3>
              <p>Please wait while we find your account! I know it's back here somewhere 🤔.</p>
            </div>
          </section>
          <section className="home-section home-about section-white section-arrow">
            <div className="home-section-content">
              <h3 className="home-section-title">About</h3>
              <p>It has become more important than ever to hold our legislators accountable. Do your current reps deserve your vote in the 2018 midterms?</p><br/>
              <p>Using public data reaching back nearly three decades—1989 through today—we combined stats about your reps' attendance, voting participation and bill sponsorship into a letter grade to gauge their job performance at the most basic level. Tally helps you learn about your reps' top issues & ideologies, and allows you to compare them to other lawmakers in both the Senate and House in every district across the country.</p><br/>
              <p>Upcoming features include a breakdown of campaign finances and donor information, and a daily analysis of the transcripts from each session (outlining highly-discussed topics and what your rep had to say on the floor that day.)</p><br/>
              <p>Unlike other political apps, Tally is journalism-free, so you can spend less time sifting through headlines and focus on metrics that matter.</p>
              <Link className="standard-link" to="/about">
                <p className="learn-more-link">Learn About Metrics</p>
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

export default Relay.createContainer(SocialConfirmation, {
  initialVariables: {
    email: null,
    social: null
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
