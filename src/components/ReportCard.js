import React from 'react';

class ReportCard extends React.Component {

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
            <div className="scorecard">
              <h3 className="name">{ fullName }</h3>
              <p className="role">{ chamber.replace(/\b\w/g, l => l.toUpperCase()) } ({this.getShortParty()}), { state }</p>
              <div className="badge-container">
                <i className="material-icons">verified_user</i>
                <i className="material-icons">monetization_on</i>
                <i className="material-icons">public</i>
                <i className="material-icons">whatshot</i>
                <i className="material-icons">star</i>
              </div>
              <div className="photo-grade-container">
                <div className="photo-container">
                  <img className="bio-photo" src={this.getPhotoSource()}/>
                </div>
                <div className="letter-grade-container">
                  <p>Job Score</p>
                  <p className="grade">A-</p>
                  <p><i className="material-icons info-icon">help_outline</i></p>
                </div>
              </div>
              <div className="alignment-container">
                <h3>Voting Alignment</h3>
                <div className="alignment-breakdown">
                  <div className="percentages">
                    <p>You</p>
                    <img src="./img/parties/you.png"/>
                    <p className="alignment-score">66%</p>
                  </div>
                  <div className="percentages">
                    <p>Democrats</p>
                    <img src="./img/parties/democrat.png"/>
                    <p className="alignment-score">98%</p>
                  </div>
                  <div className="percentages">
                    <p>Republicans</p>
                    <img src="./img/parties/republican.jpeg"/>
                    <p className="alignment-score">35%</p>
                  </div>
                </div>
              </div>
              <div className="learn-more">
                <button className="view-rep-btn">More</button>
              </div>
            </div>
        );
    }
}

export default ReportCard;
