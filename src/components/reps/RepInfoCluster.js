import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class RepInfoCluster extends React.Component {

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

  render() {
    let { address, bio_text, bioguide_id, chamber, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected, data } = this.props
    let query = { address, bio_text, bioguide_id, chamber, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected };
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');
    return (
      <Link to={{ pathname: `/bios/${bioguide_id}`, query }}>
        <div className="rep-info-cluster">
          <img src={this.getPhotoSource()} className="bio-photo"/>
          <p className="name">{ fullName }</p>
          <p className="role">{ chamber.replace(/\b\w/g, l => l.toUpperCase()) } ({this.getShortParty()})</p>
          <p className="location">{ state }</p>
          <p className="match-score">100%</p>
          <p className="with-me">matched with you</p>
        </div>
      </Link>
    );
  }

}

export default Relay.createContainer(RepInfoCluster, {
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
      }
    `
  }
});
