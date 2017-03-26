import React from 'react';
import Relay from 'react-relay';

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

  getOrdinal = (n) => {
    if ((parseFloat(n) == parseInt(n)) && !isNaN(n)) {
      let s = ['th','st','nd','rd'],
      v = n % 100;
      return n + (s[(v-20)%10] || s[v] || s[0]);
    } else {
      return n;
    } 
  }

  getBarFill = (category) => {
    let { percent_at_work, percent_votes, sponsor_percent } = this.props;
    if (category === 'attendance') return percent_at_work * 100;
    if (category === 'participation') return percent_votes * 100;
    if (category === 'efficacy') return sponsor_percent * 100;
    return false;
  }

  getShortParty = (party) => party === 'Democratic' ? '(D)' : '(R)';


  render() {

    let { name, party, state, category, days_at_work, total_work_days, percent_at_work, rep_sponsor, sponsor_percent, max_sponsor, percent_votes, rep_votes, total_votes, rank } = this.props;
    let fullName = name ? name.split(',').reverse().join().replace(/\,/g,' ') : 'John Doe';
    let attendanceMetrics = category === 'attendance'  ? `${days_at_work}/${total_work_days}` : null;
    let participationMetrics = category === 'participation' ? `${rep_votes}/${total_votes}` : null;
    let efficacyMetrics = category === 'efficacy' ? `${rep_sponsor}/${max_sponsor}` : null;
    return (
      <div className="rep-rank-list-wrap">
        <div className="rep-rank-number-wrap">
          <p className="rep-rank-number">{this.getOrdinal(rank)}</p>
        </div>
        <div className="rep-rank-cluster-wrap">
          <div className="rep-rank-headshot" style={{background: `url(${this.getPhotoSource()}) no-repeat center 10% / cover`}}></div>
          <div className="rep-rank-stack">
            <div className="rep-rank-stats">
              <p className="rep-rank-name">{fullName} {this.getShortParty(party)}, {state}</p>
              <p className="rep-rank-metrics">
                {attendanceMetrics}
                {participationMetrics}
                {efficacyMetrics}
              </p>
            </div>
            <div className="rep-rank-stats-bar">
              <div className="rep-rank-stats-fill" style={{ backgroundColor: '#47E5BC', width: `${this.getBarFill(category)}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(RepRankCluster, {
  initialVariables: {
    district: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
      }
    `
  }
});
