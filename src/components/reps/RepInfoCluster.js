import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import IconStamp from '../icons/IconStamp';

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
    } return './img/bio_images/placeholder.png';
  }

  formatParty = (party) => party === 'Democratic' ? 'Democrat' : party;

  render() {
    let { name, chamber, party, letter_grade, onClick } = this.props;
    // NOTE: null checking
    let fullName = name ? name.split(',').reverse().join().replace(/\,/g,' ') : {name};

    return (
      <div className="rep-info-cluster-wrap" onClick={onClick}>
        <div className="rep-info-cluster">
          <div className="rep-info-headshot" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover` }}></div>
          <div className="rep-info-details">
            <p className="rep-info-name">{fullName}</p>
            <p className="rep-info-role">{chamber.replace(/\b\w/g, l => l.toUpperCase())} {this.formatParty(party)}</p>
          </div>
          <div className="rep-letter-grade-wrap">
            <IconStamp />
            <span className="rep-letter-grade">{letter_grade}</span>
          </div>
        </div>
      </div>
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
