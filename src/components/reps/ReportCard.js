import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from './Attendance';
import Participation from './Participation';
import Efficacy from './Efficacy';
import MembershipStats from './MembershipStats';
import PolicyAreas from './PolicyAreas';
import { IconClose } from '../icons/Icons';

class ReportCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, chamber: props.chamber });
  }

  getPhotoSource = () => {
    let { photo_url } = this.props;
    if (!!photo_url && photo_url.toLowerCase() !== 'none') {
      return `https://www.${photo_url}`;
    }
    else {
      return './img/bio_images/placeholder.png';
    }
  }

  formatParty = (party) => party === 'Democratic' ? 'Democrat' : party;

  getFirstName = () => {
    let fullName = this.props.name.split(',').reverse().join().replace(/\,/g,' ');
    let lastName = this.props.name.split(',')[0];
    return lastName;
  }

  render() {
    let { address, bio_text, bioguide_id, chamber, congress, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected, data } = this.props;
    let query = { address, bio_text, bioguide_id, chamber, congress, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected, data };
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');

    return (
      <div className="report-card-info">
        <div className="report-card-header-wrap">
          <div className="report-card-photo-wrap">
            <div className="report-card-photo" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}} />
            <div className="report-card-close" onClick={() => this.props.close()}><IconClose width={15} height={15} stroke="#4990E2" strokeWidth="2" /></div>
          </div>
          <span className="report-card-name">{ fullName }</span>
          <span className="report-card-role">{ state } &bull; { chamber.replace(/\b\w/g, l => l.toUpperCase()) } &bull; {this.formatParty(party)}</span>
          { leadership_position !== "None" && <span className="report-card-leadership">{leadership_position}</span> }
          <div className="report-card-buttons-wrap">
            <button className="contact-btn">Contact</button>
            <button className="bio-btn">Bio</button>
          </div>
          <div className="card-toggle-wrap">
            <p className="card-toggle-stats active">Stats</p>
            <p className="card-toggle-stats">Beliefs</p>
          </div>
        </div>
        <div className="report-card-metrics-wrap">
          <h4 className="report-card-section-title">Participation Scores</h4>
          <div className="report-card-sliders">
            <Attendance {...this.props} />
            <Participation {...this.props} />
            <Efficacy {...this.props} />
            <MembershipStats {...this.props} />
          </div>
          <h4 className="report-card-section-title">Policies</h4>
          <PolicyAreas {...this.props} />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(ReportCard, {
  initialVariables: {
    bioguide_id: null,
    chamber: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
      ${Attendance.getFragment('data')}
      ${Participation.getFragment('data')}
      ${Efficacy.getFragment('data')}
      ${MembershipStats.getFragment('data')}
      ${PolicyAreas.getFragment('data')}
    }
  `
  }
});
