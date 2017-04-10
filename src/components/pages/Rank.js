import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import RepRankCluster from '../rank/RepRankCluster';
import Search from '../search/Search';
import { isLoading } from '../../utils/Utils';
import IconTriangleDown from '../icons/IconTriangleDown';
import IconClose from '../icons/IconClose';

class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attendance: false,
      participation: false,
      efficacy: true,
      bestToWorst: false,
      worstToBest: false
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
      let { attendance, participation, efficacy, bestToWorst, worstToBest } = this.state;
      return (
        <div>
          <div className="rep-rank-cluster-headline">
            <p className="rep-rank-number">#{key}</p>
            {reps[0].rep_sponsor &&
              <p className="rep-rank-totals">{reps[0].rep_sponsor}/{reps[0].max_sponsor} bills</p>
            }
            {reps[0].days_at_work &&
              <p className="rep-rank-totals">{reps[0].days_at_work}/{reps[0].total_work_days} days</p>
            }
            {reps[0].rep_votes &&
              <p className="rep-rank-totals">{reps[0].rep_votes}/{reps[0].total_votes} votes</p>
            }
          </div>
          { reps.map(rep => <RepRankCluster category={category} {...this.props} key={rep.bioguide_id} {...rep} />)}
        </div>
      )
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

  getExplainerModal = () => {
    const explainerModal = this.refs.explainerModal;
    if (explainerModal.classList.contains('open')) {
      explainerModal.classList.remove('open');
    } else {
      explainerModal.classList.add('open');
    }
  }

  getExplainerCopy = () => {
    let { attendance, participation, efficacy } = this.state;
    let { rank_attendance, rank_participation, rank_efficacy } = this.props.data;
    let total_work_days  = rank_attendance ? rank_attendance[0].total_work_days : null;
    let total_votes = rank_participation ? rank_participation[0].total_votes : null;
    let max_sponsor = rank_efficacy ? rank_efficacy[0].max_sponsor : null;
    let chamber = this.getActiveChamber();
    if (attendance) return `Compares ${chamber} reps by how many days of work they've attended vs. the ${total_work_days} work days in this term.`;
    if (participation) return `Compares ${chamber} reps by how many votes they've cast vs. the ${total_votes} votes held this term.`;
    if (efficacy) return `Compares ${chamber} reps by how many bills they've sponsored vs. the most bills created by one rep this term.`;
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
            <p className="rank-headline">Rank lawmakers based on<br/> core job functions:</p>
            <div className="rank-category-name" onClick={() => this.getDropDown()}>
              <p>{this.getActiveCategory()}</p>
              <IconTriangleDown />
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
          <input className="rank-search-filter" placeholder="Find someone..."></input>
          <button className="rank-sort-btn" onClick={() => this.getResults() }>Sort <IconTriangleDown fill="#4990E2"/></button>
          <span className="control-button question-mark-circle" onClick={() => this.getExplainerModal()}>?</span>
        </div>
        <div className="rank-list-wrap">
          <div className="rank-explainer-modal" ref="explainerModal">
            <div className="rep-card-close control-button" onClick={() => this.getExplainerModal()}>
              <IconClose width={15} height={15} stroke="#4990E2" strokeWidth="2" />
            </div>
            <p className="rank-explainer-copy">{this.getExplainerCopy()}</p>
          </div>
          {this.getRankList()}
        </div>
      </div>
    )
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
