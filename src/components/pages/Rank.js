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
    if (attendance) return 'Attendance';
    if (participation) return 'Votes';
    if (efficacy) return 'Bills';
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

  getDropDown = () => {
    const dropdown = this.refs.dropdown;
    if (dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
    } else {
      dropdown.classList.add('open');
    }
  }

  getExplainerCopy = () => {
    let { attendance, participation, efficacy } = this.state;
    let { rank_attendance, rank_participation, rank_efficacy } = this.props.data;
    let total_work_days  = rank_attendance ? rank_attendance[0].total_work_days : null;
    let total_votes = rank_participation ? rank_participation[0].total_votes : null;
    let max_sponsor = rank_efficacy ? rank_efficacy[0].max_sponsor : null;
    let chamber = this.getActiveChamber();
    let Chamber = chamber ? chamber.charAt(0).toUpperCase() + chamber.slice(1) : chamber;
    if (attendance) return `This page ranks ${Chamber} reps by how many days of work they've attended out of the ${total_work_days} work days in this term. Reps who share a rank position are listed alphabetically within their category.`;
    if (participation) return `This page ranks ${Chamber} reps by how many votes they've cast out of the ${total_votes} votes held this term. Reps who share a rank position are listed alphabetically within their category.`;
    if (efficacy) return  `This page ranks ${Chamber} reps by how many bills they've sponsored compared to the highest amount sponsored by a single rep (${max_sponsor}). Reps who share a rank position are listed alphabetically within their category.`;
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

  render() {
    return (
      <div className="rank-wrap">
        <div className="rank-controls-wrap">
          <div className="rank-category-wrap">
            <div className="rank-category-name">
              <p onClick={() => this.getDropDown()}>{this.getActiveCategory()}</p>
            </div>
            <div className="rank-category-dropdown" ref="dropdown" onClick={() => this.getDropDown()}>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Bills' ? 'active' : ''}`} onClick={() => this.setState({ attendance: false, participation: false, efficacy: true })}>Bills</p>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Attendance' ? 'active' : ''}`} onClick={() => this.setState({ attendance: true, participation: false, efficacy: false })}>Attendance</p>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Votes' ? 'active' : ''}`} onClick={() => this.setState({ attendance: false, participation: true, efficacy: false })}>Votes</p>
            </div>
          </div>
          <div className="rank-toggle-wrap">
            <p className={`rank-toggle-chamber ${this.getActiveChamber() === 'house' ? 'active' : ''}`} onClick={() => this.selectChamber('house')}>House</p>
            <p className={`rank-toggle-chamber ${this.getActiveChamber() === 'senate' ? 'active' : ''}`} onClick={() => this.selectChamber('senate')}>Senate</p>
          </div>
        </div>
        <div className="rank-sort-wrap">
        </div>
        {/* search functionality???
        <div className="rank-filter-wrap">
          <input type="text" className="filter-input-text" placeholder="Find someone" />
          <img className="filter-input-icon" src="./img/icon-filter.svg" />
        </div>*/}
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
