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

  render() {
    let { bioguide_id, location } = this.props;
    let { address, bio_text, chamber, congress_url, district, facebook, leadership_position, name, party, phone, photo_url, served_until, state, twitter_handle, twitter_url, website, year_elected, data } = location.query;
    return (
      <div className="rep-container">
        <p className="rep-name">{ name }</p>
        <p className="rep-party">{ party }</p>
        <p className="rep-chamber">{ chamber }</p>
        <p className="rep-bio_text">{ bio_text }</p>
        <div className="rep-photo-container">
          <img className="rep-photo" src={this.getPhotoSource()} />
        </div>
      </div>
    );
  }

}

export default RepBio;
