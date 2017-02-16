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

  render() {
    let { name, chamber, state, photo_url, bioguide_id, data } = this.props;
    return (
      <Link to={{ pathname: `/bios/${bioguide_id}` }}>
        <div className="rep-info-cluster">
          <img src={this.getPhotoSource()} className="bio-photo"/>
          <p className="name">{ name }</p>
          <p className="role">{ chamber }</p>
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
