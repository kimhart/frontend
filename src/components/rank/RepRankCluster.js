import React from 'react';

class RepRankCluster extends React.Component {

  constructor(props) {
    super(props);
  }

  getPhotoSource = () => {
    let { photo_url } = this.props;
    if (!!photo_url && photo_url.toLowerCase() !== 'none') {
      return `https://www.${photo_url}`;
    } else {
      return './img/bio_images/placeholder.png';
    }
  }

  getBarFill = (category) => {
    let { percent_at_work, percent_votes, sponsor_percent } = this.props;
    if (category === 'attendance') return percent_at_work * 100;
    if (category === 'participation') return percent_votes * 100;
    if (category === 'efficacy') return sponsor_percent * 100;
    return false;
  }

  getShortParty = (party) => {
    if (party === 'Democratic') return <span className="democrat-blue">Democrat</span>;
    if (party === 'Independent') return <span className="independent-purple">Independent</span>;
    if (party === 'Republican') return <span className="republican-red">Republican</span>;
    return false;
  }

  render() {
    let { name, party, state, category, days_at_work, total_work_days, percent_at_work, rep_sponsor, sponsor_percent, max_sponsor, percent_votes, rep_votes, total_votes, rank } = this.props;
    let fullName = name ? name.split(',').reverse().join().replace(/\,/g,' ') : 'John Doe';
    return (
      <div className="rep-rank-cluster-wrap">
        <div className="rep-rank-headshot" style={{background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}}></div>
        <div className="rep-rank-stack">
          <div className="rep-rank-stats">
            <p className="rep-rank-name">{fullName} &middot;{this.getShortParty(party)}</p>
          </div>
          <div className="rep-rank-stats-bar">
            <div className="rep-rank-stats-fill" style={{ backgroundColor: '#47E5BC', width: `${this.getBarFill(category)}%`}}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RepRankCluster;
