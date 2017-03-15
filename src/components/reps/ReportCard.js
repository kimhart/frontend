import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from './Attendance';
import Participation from './Participation';
import Efficacy from './Efficacy';
import MembershipStats from './MembershipStats';
import PolicyAreas from './PolicyAreas';


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
      <div className="report-card-wrap">
        <div className="report-card">
          <div className="report-card-photo-wrap">
            <div className="report-card-photo" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}} />
            <div className="report-card-close" onClick={() => this.props.close()}><p>x</p></div>
          </div>
          <p className="report-card-name">{fullName}</p>
          <p className="report-card-role">{ chamber.replace(/\b\w/g, l => l.toUpperCase()) } ({this.getShortParty()}), { state }</p>
          { leadership_position !== "None" && <p className="leadership">{leadership_position}</p> }
          <div className="report-card-metrics-wrap">
            <div className="report-card-sliders">
              <h4 className="report-card-section-title">What's their track record?</h4>
              <Attendance {...this.props} />
              <Participation {...this.props} />
              <h4 className="report-card-section-title">How do they stack up?</h4>
              <p>{this.getFirstName()}'s contributions compared to the max contributions by other reps:</p>
              <Efficacy {...this.props} />
              <MembershipStats {...this.props} />
              <PolicyAreas {...this.props} />
            </div>
          </div>
          <div className="report-card-learn-more">
            <Link to={{ pathname: `/bios/${bioguide_id}`, query }} style={{ textDecoration: 'none' }}>
              <button className="view-rep-btn">More</button>
            </Link>
          </div>
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
