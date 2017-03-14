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

  formatParty = () => {
    let { party } = this.props;
    let dem;
    if (party === 'Democratic') {
      dem = 'Democrat';
      return dem;
    } return party;
  }

  render() {
    let { address, bio_text, bioguide_id, chamber, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected, data } = this.props;
    let query = { address, bio_text, bioguide_id, chamber, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected };
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');

    return (
      <Link className="cluster-link" to={{ pathname: `/bios/${bioguide_id}`, query }} style={{ textDecoration: 'none' }}>
        <div className="cluster">
          <div className="headshot" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`, width: '140px'}}></div>
          <div className="name-and-position">
            <p className="name">{fullName}</p>
            <p className="role">{chamber.replace(/\b\w/g, l => l.toUpperCase())} {this.formatParty()}</p>
          </div>
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
      }
    `
  }
});
