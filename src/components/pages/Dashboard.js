import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import RepInfoCluster from './../reps/RepInfoCluster';
import ReportCard from './../reps/ReportCard';
import { UserUtils } from './../../utils/Utils';
import { browserHistory } from 'react-router';
import Modal from 'react-modal';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    let { user } = props;
    this.state = {
      user,
      activeReportCard: null
    };
    props.relay.setVariables({ district: parseInt(user.district), state_long: user.state_long });
  }

  getRepInfoClusters = () => {
    let { reps } = this.props.data;
    return reps ? reps.map(rep => <RepInfoCluster {...this.props} key={`repinfocluster_${rep.bioguide_id}`} {...rep} onClick={() => this.setState({ activeReportCard: rep.bioguide_id })}/>) : null;
  }

  logOut = () => {
    UserUtils.logOut();
  }

  getReportCards = () => {
    let { activeReportCard } = this.state;
    let { reps } = this.props.data;
    return reps
    ? reps.map(rep => {
      return (
        <Modal key={`reportcard_${rep.bioguide_id}`} contentLabel={`${rep.name} modal`} className={`rep-card-wrap`} isOpen={rep.bioguide_id === activeReportCard} style={{ overflowY: 'scroll' }}>
          <ReportCard {...this.props} {...rep} close={() => this.setState({ activeReportCard: null })} />
        </Modal>
      );
    })
    : null;
  }

  getActiveReportCard = () => {
    let { activeReportCard } = this.state;
    let { reps } = this.props.data;
    let rep = reps && activeReportCard ? reps.find(({ bioguide_id }) => bioguide_id === activeReportCard) : null;
    return rep ? <ReportCard {...this.props} {...rep} key={`reportcard_${rep.bioguide_id}`} close={() => this.setState({ activeReportCard: null })} /> : null;
  }

  getDistrict = (user) => user.district === 0 ? 'At Large' : user.district;

  render() {
    let { user } = this.state;
    return (
      <div className="main-dash">
        <div className="greeting-banner">
          <h2 className="greeting">Welcome {user.first_name}</h2>
          <p className="logout" onClick={() => this.logOut()}>Logout</p>
        </div>
        <div className="your-location">
          <h3 className="headline">Your Representatives</h3>
          <p className="your-district">{user.state_long} Congressional District {this.getDistrict(user)}</p>
        </div>
        <div className="rep-info-clusters">
          {this.getRepInfoClusters()}
          {this.getReportCards()}
        </div>
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
          letter_grade
          name
          number_grade
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
        ${ReportCard.getFragment('data')}
      }
    `
  }
});
