import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import RepRankCluster from '../rank/RepRankCluster';
import Search from '../search/Search';
import { isLoading } from '../../utils/Utils';

class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attendance: false,
      participation: false,
      efficacy: true
    };
    props.relay.setVariables({ chamber: 'house' }, ({ aborted, done, error }) => {
      if (aborted || done || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }

  getRankList = () => {
    let { attendance, participation, efficacy } = this.state;
    let { rank_attendance, rank_participation, rank_efficacy } = this.props.data;
    if (attendance) return this.getResults({ category: 'attendance', data: rank_attendance });
    if (participation) return this.getResults({ category: 'participation', data: rank_participation });
    if (efficacy) return this.getResults({ category: 'efficacy', data: rank_efficacy });
    return false;
  }

  getResults = ({ category, data }) => {
    if (!data) return null;
    let rankDict = {};
    data.forEach(datum => {
      let { rank } = datum;
      if (!rankDict[rank]) {
        rankDict[rank] = [datum];
      }
      else {
        rankDict[rank].push(datum);
      }
    })
    return Object.keys(rankDict).map(key => {
      let reps = rankDict[key];
      let { attendance, participation, efficacy } = this.state;
      return (
        <div>
          <p className="rep-rank-number">{key}.</p>
          { reps.map(rep => <RepRankCluster category={category} {...this.props} key={rep.bioguide_id} {...rep} />) }
        </div>
      );
    });
  }

  getActiveCategory = () => {
    let { attendance, participation, efficacy } = this.state;
    if (attendance) return 'attendance';
    if (participation) return 'votes';
    if (efficacy) return 'bills';
    return false;
  }

  getActiveChamber = () => {
    let { pendingVariables, variables } = this.props.relay;
    if (pendingVariables && pendingVariables.chamber) {
      return pendingVariables.chamber;
    } else {
      return variables.chamber;
    }
  }

  getExplainerCopy = () => {
    let { attendance, participation, efficacy } = this.state;
    if (attendance) return 'Days at work compared to the total work days this term.';
    if (participation) return 'Votes cast compared to the total votes held this term.';
    if (efficacy) return 'Bills created compared to the most bills created by a single rep this term.';
    return false;
  }

  selectChamber = (chamber) => {
    this.props.relay.setVariables({ chamber }, ({ aborted, done, error }) => {
      if (aborted || done || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }

  sortRank = () => {

  }

  render() {
    return (
      <div className="rank-wrap">
        <div className="rank-controls-wrap">
          <div className="rank-category-wrap">
            <p className={`rank-category-item ${this.getActiveCategory() === 'bills' ? 'active' : ''}`} onClick={() => this.setState({ attendance: false, participation: false, efficacy: true })}>Bills</p>
            <p className={`rank-category-item ${this.getActiveCategory() === 'attendance' ? 'active' : ''}`} onClick={() => this.setState({ attendance: true, participation: false, efficacy: false })}>Attendance</p>
            <p className={`rank-category-item ${this.getActiveCategory() === 'votes' ? 'active' : ''}`} onClick={() => this.setState({ attendance: false, participation: true, efficacy: false })}>Votes</p>
          </div>
          <div className="rank-category-explainer-wrap">
            <p className="rank-category-explainer-copy">{this.getExplainerCopy()}</p>
          </div>
          <div className="rank-toggle-wrap">
            <p className={`rank-toggle-chamber ${this.getActiveChamber() === 'house' ? 'active' : ''}`} onClick={() => this.selectChamber('house')}>House</p>
            <p className={`rank-toggle-chamber ${this.getActiveChamber() === 'senate' ? 'active' : ''}`} onClick={() => this.selectChamber('senate')}>Senate</p>
          </div>
        </div>
        <div className="rank-sort-wrap">
          <button className="rank-sort-btn" onClick={this.sortRank()}>Sort B to W</button>
        </div>
        {/* search functionality???
        <div className="rank-filter-wrap">
          <input type="text" className="filter-input-text" placeholder="Find someone" />
          <img className="filter-input-icon" src="./img/icon-filter.svg" />
        </div>
        */}
        <div className="rank-list-wrap">
          {this.getRankList()}
        </div>
      </div>
    );
  }
}


export default Relay.createContainer(Rank, {
  initialVariables: {
    chamber: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
      rank_attendance(chamber: $chamber) {
        bioguide_id
        days_at_work
        district
        name
        party
        percent_at_work
        photo_url
        rank
        state
        total_work_days
      }
      rank_efficacy(chamber: $chamber) {
        bioguide_id
        rep_sponsor
        district
        name
        party
        sponsor_percent
        photo_url
        rank
        state
        max_sponsor
      }
      rank_participation(chamber: $chamber) {
        bioguide_id
        district
        name
        party
        percent_votes
        photo_url
        rank
        rep_votes
        state
        total_votes
      }
    }
  `
  }
});
