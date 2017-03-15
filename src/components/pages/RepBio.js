import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Attendance from '../reps/Attendance';
import Participation from '../reps/Participation';
import Efficacy from '../reps/Efficacy';
import MembershipStats from '../reps/MembershipStats';
import PolicyAreas from '../reps/PolicyAreas';

class RepBio extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.location.query.bioguide_id, chamber: props.location.query.chamber });
  }

  getPhotoSource = () => {
    let { photo_url } = this.props.location.query;
    if (!!photo_url && photo_url.toLowerCase() !== 'none') {
      return `https://www.${photo_url}`;
    } return '/img/bio_images/placeholder.png';
  }

  getMemberships = () => {
    let { memberships } = this.props.data;
    return memberships ? memberships.map((membership, index) => <li key={index}>{membership.committee}</li>) : null;
  }

  formatParty = (party) => party === 'Democratic' ? 'Democrat' : party;

  render() {
    let { location } = this.props;
    let { bioguide_id, address, bio_text, chamber, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected } = location.query;
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');
    return (
      <div className="bio-container">
        <section className="bio-header">
          <h2 className="page-title">{fullName}</h2>
          <h4 className="position">{chamber.replace(/\b\w/g, l => l.toUpperCase())} {this.formatParty(party)}</h4>
          <h4 className="location">{state}</h4>
          <div className="bio-photo" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}}></div>
        </section>
        <section className="bio-body">
          <p className="bio-text">{bio_text}</p>
        </section>
        <section className="memberships">
          <ul>
            {this.getMemberships()}
          </ul>
        </section>
      </div>
    );
  }
}


export default Relay.createContainer(RepBio, {
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
      ${MembershipStats.getFragment('data')}
      ${PolicyAreas.getFragment('data')}
    }
  `
  }
});

