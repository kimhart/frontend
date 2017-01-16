import React from 'react';
import Relay from 'react-relay';
import RepBio from './RepBio';
import Senators from './Senators';
import Congresspeople from './Congresspeople';
import AddressForm from './AddressForm';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import TallyScore from './TallyScore';


class MainDash extends React.Component {

  render() {
    return (
      <div className="main-dash">
        <Row>
          <Col md={12}>
            <h2 className="page-title">Tally Card</h2>
            <TallyScore/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3>Your Representatives</h3>
            <div className="reps-list">
              <div className="rep-info-cluster">
                <img src="./img/bio_images/placeholder.png" className="bio-photo"/>
                <p className="name">Kristin Gillibrand</p>
                <p className="role">Senate (D)</p>
                <p className="location">New York</p>
                <p className="match-score">100%</p>
                <p className="with-me">matched with me</p>
              </div>
              <div className="rep-info-cluster">
                <img src="./img/bio_images/placeholder.png" className="bio-photo"/>
                <p className="name">Snoop Dogg</p>
                <p className="role">Senate (D)</p>
                <p className="location">New York</p>
                <p className="match-score">84%</p>
                <p className="with-me">matched with me</p>
              </div>
              <div className="rep-info-cluster">
                <img src="./img/bio_images/placeholder.png" className="bio-photo"/>
                <p className="name">Chris Farley</p>
                <p className="role">Congress (R)</p>
                <p className="location">The Moon</p>
                <p className="match-score">21%</p>
                <p className="with-me">matched with me</p>
              </div>
              <Senators {...this.props} {...this.state} />
              <Congresspeople {...this.props} {...this.state} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Relay.createContainer(MainDash, {
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
