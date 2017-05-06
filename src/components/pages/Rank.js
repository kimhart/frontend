import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import RepRankClusterGroup from '../rank/RepRankClusterGroup';
import Search from '../search/Search';
import { isLoading } from '../../utils/Utils';
import { IconTriangleDown, IconClose, IconAngleDown, IconSearch, TallyLogo } from '../icons/Icons';

class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attendance: false,
      participation: false,
      efficacy: true,
      bestToWorst: true
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

  groupResultsByRank(data) {
    let rankDict = {};
    data.forEach(datum => {
      let { rank } = datum;
      if (!rankDict[rank]) {
        rankDict[rank] = [datum];
      }
      else {
        rankDict[rank].push(datum);
      }
    });
    return rankDict;
  }

  getResults = ({ category, data }) => {
    let { bestToWorst } = this.state;
    let { chamber } = this.props.relay.variables;
    if (!data) return null;
    let rankDict = this.groupResultsByRank(data);
    if (bestToWorst) {
      return Object.keys(rankDict).map(key => <RepRankClusterGroup key={`${key}${category}${chamber}${bestToWorst}`} {...this.state} reps={rankDict[key]} category={category} rank={key} />);
    } else {
      return Object.keys(rankDict).reverse().map(key => <RepRankClusterGroup key={`${key}${category}${chamber}${bestToWorst}`} {...this.state} reps={rankDict[key]} category={category} rank={key} />);
    }
  }

  getActiveCategory = () => {
    let { attendance, participation, efficacy } = this.state;
    if (attendance) return 'Work Attendance';
    if (participation) return 'Votes Cast';
    if (efficacy) return 'Bills Sponsored';
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
    const explainerOverlay = this.refs.explainerOverlay;
    if (explainerModal.classList.contains('open')) {
      explainerModal.classList.remove('open');
      explainerOverlay.classList.remove('open');
    } else {
      explainerModal.classList.add('open');
      explainerOverlay.classList.add('open');
    }
  }

  getExplainerCopy = () => {
    let { attendance, participation, efficacy } = this.state;
    let { rank_attendance, rank_participation, rank_efficacy } = this.props.data;
    let total_work_days  = rank_attendance ? rank_attendance[0].total_work_days : null;
    let total_votes = rank_participation ? rank_participation[0].total_votes : null;
    let max_sponsor = rank_efficacy ? rank_efficacy[0].max_sponsor : null;
    let chamber = this.getActiveChamber();
    if (attendance) return (
      <div>
        <span className="explainer-title">Work Attendance</span>
        <span className="explainer-copy">You're currently ranking {chamber} reps based on how many days of work they've attended vs. the {total_work_days} total work days in this term.<br/><br/> Reps who share a rank position are listed alphabetically within their category.</span>
      </div>
    );
    if (participation) return (
      <div>
        <span className="explainer-title">Votes Cast</span>
        <span className="explainer-copy">You're currently ranking {chamber} reps based on how many votes they've cast vs. the {total_votes} votes held this term.<br/><br/> Reps who share a rank position are listed alphabetically within their category.</span>
      </div>
    );
    if (efficacy) return (
      <div>
        <span className="explainer-title">Bills Sponsored</span>
        <span className="explainer-copy">You're currently ranking {chamber} reps based on how many bills they've sponsored vs. the <em>most</em> bills created by one rep this term, which is currently {max_sponsor}.<br/><br/> Reps who share a rank position are listed alphabetically within their category.</span>
      </div>
    );
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
    const { bestToWorst } = this.state;
    return (
      <div className="rank-wrap">
        <header className="logo">
          <div className="logo-container">
            <Link to="/">
              <TallyLogo />
              <span className="tally-logo-helper">Tally</span>
            </Link>
          </div>
        </header>
        <div className="rank-controls-wrap">
          <div className="rank-category-wrap">
            <p className="rank-headline">Rank based on core job performance:</p>
            <div className="rank-category-name" onClick={() => this.getDropDown()}>
              <p>{this.getActiveCategory()}</p>
              <IconTriangleDown />
            </div>
            <div className="rank-category-dropdown" ref="dropdown" onClick={() => this.getDropDown()}>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Bills' ? 'active' : ''}`} onClick={() => this.setState({ attendance: false, participation: false, efficacy: true })}>Bills Sponsored</p>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Attendance' ? 'active' : ''}`} onClick={() => this.setState({ attendance: true, participation: false, efficacy: false })}>Work Attendance</p>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Votes' ? 'active' : ''}`} onClick={() => this.setState({ attendance: false, participation: true, efficacy: false })}>Votes Cast</p>
            </div>
          </div>
          <div className="rank-toggle-wrap">
            <p className={`rank-toggle-chamber ${this.getActiveChamber() === 'house' ? 'active' : ''}`} onClick={() => this.selectChamber('house')}>House</p>
            <p className={`rank-toggle-chamber ${this.getActiveChamber() === 'senate' ? 'active' : ''}`} onClick={() => this.selectChamber('senate')}>Senate</p>
          </div>
        </div>
        <div className="rank-sort-wrap">
          <div className="rank-search">
            <input className="rank-search-filter" placeholder="Search" />
            <div className="search-bar-icon">
              <IconSearch width="20px" fill="#4990E2" />
            </div>
          </div>
          <button className="rank-sort-btn" onClick={() => this.setState({bestToWorst: !bestToWorst})}>
            Sort
            <div className="sort-arrow">
              <IconAngleDown fill="#4990E2" transform={bestToWorst ? null : 'rotate(180)'} />
            </div>
          </button>
          <span className="control-button question-mark-circle" onClick={() => this.getExplainerModal()}>?</span>
        </div>
        <div className="rank-list-wrap">
          <div className="rank-modal-overlay" ref="explainerOverlay" onClick={() => this.getExplainerModal()}></div>
          <div className="rank-explainer-modal" ref="explainerModal">
            <div className="rep-card-close control-button" onClick={() => this.getExplainerModal()}>
              <IconClose width={15} height={15} stroke="#4990E2" strokeWidth="2" />
            </div>
            {this.getExplainerCopy()}
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
