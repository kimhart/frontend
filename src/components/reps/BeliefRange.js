import React from 'react';

class BeliefRange extends React.Component {

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
    let { tally_score } = this.props;
    let converted_percent = ((tally_score / 6) * 100) + 50;
    return (
      <div className="rep-belief-slider-wrap">
        <div className="rep-belief-slider" style={{ left: `calc(${converted_percent}% - 15px)`, background: `url(${this.getPhotoSource()}) no-repeat`, backgroundSize: '100%' }} />
      </div>
    );
  }

}

export default BeliefRange;
