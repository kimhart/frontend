import React, { Component, PropTypes } from 'react';

class RepBio extends Component {

  getPhotoSource = () => {
    let { photo_url } = this.props.location.query;
    if (!!photo_url && photo_url.toLowerCase() !== 'none') {
      return `https://www.${photo_url}`;
    }
    else {
      return '/img/bio_images/placeholder.png';
    }
  }

  formatDemocrat = (party) => {
    let partyId;
    if (party === 'Democratic') {
      partyId = 'Democrat';
    } else {
      partId = party;
    }
    return partyId;
  }

  render() {
    let { bioguide_id, location } = this.props;
    let { address, bio_text, chamber, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected, data } = location.query;
    let fullName = name.split(',').reverse().join().replace(/\,/g,' ');

    return (
      <div className="bio-container">
        <section className="bio-header">
          <h2 className="page-title">{fullName}</h2>
          <h4 className="party">{this.formatDemocrat(party)}</h4>
          <h4 className="position">{chamber.replace(/\b\w/g, l => l.toUpperCase())}, {state}</h4>
          <div className="bio-photo" style={{ background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}}></div>
        </section>
        <section className="bio-body">
          <p className="bio-text">{bio_text}</p>
        </section>
      </div>
    );
  }

}

export default RepBio;
