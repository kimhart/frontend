import React from 'react';
import Relay from 'react-relay';
import RepBio from './RepBio';
import Senators from './Senators';
import Congresspeople from './Congresspeople';
import AddressForm from './AddressForm';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import TallyScore from './TallyScore';

class DashboardPage extends React.Component {

  render() {
    return (
      <div className="main-dash">
        <Row>
          <Col md={12}>
            <h2 className="page-title">Tally</h2>
            <TallyScore/>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="reps-display">
            <h2>Your Reps</h2>
            <div className="reps-list">
              <div className="rep-info-cluster">
                <img src="./img/bio_images/placeholder.png" className="bio-photo"/>
                <p className="name">Kristin Gillibrand</p>
                <p className="role">Senate (D)</p>
                <p className="location">New York</p>
                <p className="match-score">100%</p>
                <p className="with-me">matched with you</p>
              </div>
              <div className="rep-info-cluster">
                <img src="./img/bio_images/placeholder.png" className="bio-photo"/>
                <p className="name">Snoop Dogg</p>
                <p className="role">Senate (D)</p>
                <p className="location">New York</p>
                <p className="match-score">84%</p>
                <p className="with-me">matched with you</p>
              </div>
              <div className="rep-info-cluster">
                <img src="./img/bio_images/placeholder.png" className="bio-photo"/>
                <p className="name">Chris Farley</p>
                <p className="role">House (R)</p>
                <p className="location">The Moon</p>
                <p className="match-score">21%</p>
                <p className="with-me">matched with you</p>
              </div>
              <div className="rep-info-cluster">
                <img src="./img/bio_images/placeholder.png" className="bio-photo"/>
                <p className="name">Ryan Gosling</p>
                <p className="role">House (R)</p>
                <p className="location">California</p>
                <p className="match-score">112%</p>
                <p className="with-me">matched with you</p>
              </div>
              <Senators {...this.props} {...this.state} />
              <Congresspeople {...this.props} {...this.state} />
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
      </div>
    );
  }

}

export default Relay.createContainer(DashboardPage, {
  initialVariables: {
    street: null,
    zipcode: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        ${Senators.getFragment('data', )}
        ${Congresspeople.getFragment('data', )}
      }
    `
  }
});
