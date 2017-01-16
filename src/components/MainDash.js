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
              <p>hey</p>
              <p>you</p>
              <p>guys</p>
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
