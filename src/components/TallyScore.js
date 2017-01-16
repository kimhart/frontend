import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


class TallyScore extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        tallyScore: null, 
      }
    }

    render() {
      return (
        <div>
          <Row>
            <Col md={12}>
              <div className="tally-container">
                <h1 className="tally-score">66</h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="score-toggle">
                <a href="#" className="active">Current</a> | <a href="#">Predictive</a>
                <p className="toggle-description">Explainer copy goes here. Lorem ipsum lorem ipsum lorem ipsum lorem ipsum.</p>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
}

export default Relay.createContainer(TallyScore, {
  initialVariables: {
    TallyScore: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});

