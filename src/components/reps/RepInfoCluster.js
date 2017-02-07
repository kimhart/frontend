import React from 'react';

class RepInfoCluster extends React.Component {

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
    let { name, chamber, state, photo_url } = this.props;
    return (
      <div className="rep-info-cluster">
        <img src={this.getPhotoSource()} className="bio-photo"/>
        <p className="name">{ name }</p>
        <p className="role">{ chamber }</p>
        <p className="location">{ state }</p>
        <p className="match-score">100%</p>
        <p className="with-me">matched with you</p>
      </div>
    );
  }

}

export default RepInfoCluster;
