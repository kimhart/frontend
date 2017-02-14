import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import RepBio from './RepBio';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import AddressForm from './AddressForm';
import TallyScore from './TallyScore';
import Footer from './Footer';
import LoginPage from './LoginLogoutPage';
import RepInfoCluster from './reps/RepInfoCluster';
import { UserUtils } from '../utils/Utils';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: UserUtils.getUser() };
  }

  getRepInfoClusters = () => {
    let { user } = this.props.data;
    if (user && user.reps) {
      return user.reps.map(rep => <RepInfoCluster key={rep.bioguide_id} {...rep} />);
    }
    else {
      return null;
    }
  }

  render() {
    let { user } = this.state;
    return (
      <div className="main-dash">
        <Row>
          <Col md={12}>
            <h2 className="page-title">Hey {user.first_name}</h2>
            <TallyScore />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="reps-display">
            <h2>Your Reps</h2>
            <div className="reps-list">
              { this.getRepInfoClusters() }
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="scorecards-list">
            <h2>Report Cards</h2>
            <div className="scorecard">
              <h3 className="name">Kristin Gillibrand</h3>
              <p className="role">Senate (D), New York</p>
              <div className="badge-container">
                <i className="material-icons">verified_user</i>
                <i className="material-icons">monetization_on</i>
                <i className="material-icons">public</i>
                <i className="material-icons">whatshot</i>
                <i className="material-icons">star</i>
              </div>
              <div className="photo-grade-container">
                <div className="photo-container">
                  <img className="bio-photo" src="./img/bio_images/placeholder.png"/>
                </div>
                <div className="letter-grade-container">
                  <p>Job Score</p>
                  <p className="grade">A-</p>
                  <p><i className="material-icons info-icon">help_outline</i></p>
                </div>
              </div>
              <div className="alignment-container">
                <h3>Voting Alignment</h3>
                <div className="alignment-breakdown">
                  <div className="percentages">
                    <p>You</p>
                    <img src="./img/parties/you.png"/>
                    <p className="alignment-score">66%</p>
                  </div>
                  <div className="percentages">
                    <p>Democrats</p>
                    <img src="./img/parties/democrat.png"/>
                    <p className="alignment-score">98%</p>
                  </div>
                  <div className="percentages">
                    <p>Republicans</p>
                    <img src="./img/parties/republican.jpeg"/>
                    <p className="alignment-score">35%</p>
                  </div>
                </div>
              </div>
              <div className="learn-more">
                <button className="view-rep-btn">More</button>
              </div>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default Relay.createContainer(DashboardPage, {
  initialVariables: {
    email: null,
    password: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        user(email: $email, password: $password) {
          first_name
          # reps {
          #   address
          #   bio_text
          #   bioguide_id
          #   chamber
          #   congress_url
          #   district
          #   facebook
          #   leadership_position
          #   name
          #   party
          #   phone
          #   photo_url
          #   served_until
          #   state
          #   twitter_handle
          #   twitter_url
          #   website
          #   year_elected
          #   memberships {
          #     bioguide_id
          #     committee
          #     committee_leadership
          #     subcommittee
          #   }
          # }
        }
      }
    `
  }
});
