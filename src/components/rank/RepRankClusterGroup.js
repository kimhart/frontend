import React from 'react';
import RepRankCluster from '../rank/RepRankCluster';

class RepRankClusterGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reps: props.reps,
      limit: 3,
      max: props.reps.length
    };
  }

  getOrdinal(i) {
    let j = i % 10;
    let k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";
  }

  render() {
    let { attendance, participation, efficacy, bestToWorst, category, rank } = this.props;
    let { reps, limit, max } = this.state;
    return (
      <div className="rep-rank-clusters">
        <div className="rep-rank-cluster-headline">
          <p className="rep-rank-number">{this.getOrdinal(rank)}</p>
          {reps[0].rep_sponsor >= 0 &&
            <p className="rep-rank-totals">{reps[0].rep_sponsor}/{reps[0].max_sponsor} bills</p>
          }
          {reps[0].days_at_work >= 0 &&
            <p className="rep-rank-totals">{reps[0].days_at_work}/{reps[0].total_work_days} days</p>
          }
          {reps[0].rep_votes >= 0 &&
            <p className="rep-rank-totals">{reps[0].rep_votes}/{reps[0].total_votes} votes</p>
          }
        </div>
        <div className="reps-list">
          { reps.length > limit
            ? reps.slice(0, limit).map(rep => <RepRankCluster category={category} {...this.props} key={rep.bioguide_id} {...rep} />)
            : reps.map(rep => <RepRankCluster category={category} {...this.props} key={rep.bioguide_id} {...rep} />)
          }
        </div>
        { reps.length > 3
          ? <div className="view-more-reps" onClick={() => this.setState({ limit: limit === 3 ? max : 3 })}>Show {reps.length - 3} { limit === 3 ? 'more' : 'less' } reps tied for {this.getOrdinal(rank)} place</div> 
          : null
        }
      </div>
    );
  }

}

export default RepRankClusterGroup;
