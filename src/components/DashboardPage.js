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
import ReportCard from './ReportCard';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    let user = UserUtils.getUser();
    this.state = { user };
    props.relay.setVariables({ district: parseInt(user.district), state_long: user.state_long });
  }

  getRepInfoClusters = () => {
    let { reps } = this.props.data;
    return reps ? reps.map(rep => <RepInfoCluster {...this.props} key={`repinfocluster_${rep.bioguide_id}`} {...rep} />) : null;
  }

  getReportCards = () => {
    let { reps } = this.props.data;
    return reps ? reps.map(rep => <ReportCard key={`reportcard_${rep.bioguide_id}`} {...rep} />) : null;
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
            { this.getReportCards() }
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default Relay.createContainer(DashboardPage, {
  initialVariables: {
    district: null,
    state_long: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        reps(district: $district, state_long: $state_long) {
          address
          bio_text
          bioguide_id
          chamber
          congress_url
          district
          facebook
          leadership_position
          name
          party
          phone
          photo_url
          served_until
          state
          twitter_handle
          twitter_url
          website
          year_elected
        }
        ${RepInfoCluster.getFragment('data')}
      }
    `
  }
});
