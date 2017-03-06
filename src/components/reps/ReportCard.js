import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from './Attendance';
import Participation from './Participation';
import Efficacy from './Efficacy';

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

  getShortParty = () => {
    let { party } = this.props;
    let shortParty;
    if (party === 'Republican') {
      shortParty = 'R';
    } else if (party === 'Democratic') {
      shortParty = 'D';
    } else if (party === 'Independent') {
      shortParty = 'I';
    } else if (party === 'Independent Democrat') {
      shortParty = 'ID';
    } else if (party === 'Independent Republican') {
      shortParty = 'IR';
    } else {
      shortParty = party;
    }
    return shortParty;
  }

  getMemberships = () => {
    let { memberships } = this.props.data;
    return memberships ? memberships.map((membership, index) => <li key={index}>{membership.committee}</li>) : null;
  }

  render() {
    let { address, bio_text, bioguide_id, chamber, congress, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected, data } = this.props
    let query = { address, bio_text, bioguide_id, chamber, congress, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected };
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');

    return (
      <div className="card">
        <p className="name">{fullName}</p>
        <p className="role">{ chamber.replace(/\b\w/g, l => l.toUpperCase()) } ({this.getShortParty()}), { state }</p>
        { leadership_position !== "None" && <p className="leadership">{leadership_position}</p> }
        <div className="photo-container">
          <div className="bio-photo" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}} />
        </div>
        <div className="memberships">
          <h4>Memberships:</h4>
            <ul> {this.getMemberships()} </ul>
        </div>
        <div className="metrics-container">
          <div className="sliders">
            <Attendance {...this.props} />
            <Participation {...this.props} />
            <Efficacy {...this.props} />
          </div>
        </div>
        <div className="alignment-container">
          <h3>Voting Alignment</h3>
        </div>
        <div className="learn-more">
          <Link to={{ pathname: `/bios/${bioguide_id}`, query }} style={{ textDecoration: 'none' }}>
            <button className="view-rep-btn">More</button>
          </Link>
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
      memberships(bioguide_id: $bioguide_id, chamber: $chamber) {
        bioguide_id
        committee
        committee_leadership
        subcommittee
      }
      ${Attendance.getFragment('data')}
      ${Participation.getFragment('data')}
      ${Efficacy.getFragment('data')}
    }
  `
  }
});
