import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import RepRankClusterGroup from '../rank/RepRankClusterGroup';
import Modal from 'react-modal';
import { isLoading } from '../../utils/Utils';
import { IconTriangleDown, IconClose, IconAngleDown, IconSearch, TallyLogo } from '../icons/Icons';

class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attendance: false,
      participation: false,
      efficacy: true,
      bestToWorst: true,
      search_term: null
    };
    props.relay.setVariables({ chamber: 'house' }, ({ aborted, done, error }) => {
      if (aborted || done || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }

  selectChamber = (chamber) => {
    this.props.relay.setVariables({ chamber }, ({ aborted, done, error }) => {
      if (aborted || done || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }

  handleSearch = _.debounce(() => {
    this.props.relay.setVariables({
      search_term: this.searchBox.value,
      category: this.getCategorySimple()
    }, ({ aborted, done, error }) => {
      if (aborted || done || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }, 300);


  getRankList = () => {
    let { attendance, participation, efficacy } = this.state;
    let { rank_attendance, rank_participation, rank_efficacy, search } = this.props.data;
    if (!search.length && this.searchBox && this.searchBox.value) return this.getResults({ data: 'blank' })
    if (attendance) return this.getResults({ category: 'attendance', data: search.length > 0 ? search : rank_attendance });
    if (participation) return this.getResults({ category: 'participation', data: search.length > 0 ? search : rank_participation });
    if (efficacy) return this.getResults({ category: 'efficacy', data: search.length > 0 ? search : rank_efficacy });
  }

  getResults = ({ category, data }) => {
    let { bestToWorst } = this.state;
    let { chamber } = this.props.relay.variables;
    if (!data) return null;
    if (data === 'blank') return <p className="no-results">No results match that search in the {chamber}.</p>;
    let rankDict = this.groupResultsByRank(data);
    if (bestToWorst) {
      return Object.keys(rankDict).map(key => <RepRankClusterGroup key={`${key}${category}${chamber}${bestToWorst}`} {...this.props} {...this.state} reps={rankDict[key]} category={category} rank={key} chamber={chamber} />);
    } else {
      return Object.keys(rankDict).reverse().map(key => <RepRankClusterGroup key={`${key}${category}${chamber}${bestToWorst}`} {...this.props} {...this.state} reps={rankDict[key]} category={category} rank={key} chamber={chamber} />);
    }
  }

  groupResultsByRank(data) {
    let rankDict = {};
    data.forEach(datum => {
      let { rank } = datum;
      if (!rankDict[rank]) {
        rankDict[rank] = [datum];
      } else {
        rankDict[rank].push(datum);
      }
    });
    return rankDict;
  }

  getActiveCategory = () => {
    let { attendance, participation, efficacy } = this.state;
    if (attendance) return 'Work Attendance';
    if (participation) return 'Votes Cast';
    if (efficacy) return 'Bills Sponsored';
    return false;
  }

  getCategorySimple = () => {
    let { attendance, participation, efficacy } = this.state;
    if (attendance) return 'attendance';
    if (participation) return 'participation';
    if (efficacy) return 'efficacy';
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

  getExplainerModal = (e) => {
    e ? e.stopPropagation() : null;
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


  render() {
    const { bestToWorst } = this.state;
    return (
      <div className="rank-wrap">
        <div className="blue-header">
          <div className="rank-category-wrap">
            <p className="rank-headline">Rank reps by performance:</p>
            <div className="rank-category-name" onClick={() => this.getDropDown()}>
              <div className="rank-category-value">{this.getActiveCategory()}</div>
              <IconAngleDown strokeWidth="3" />
            </div>
            <div className="rank-category-dropdown" ref="dropdown" onClick={() => this.getDropDown()}>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Bills' ? 'active' : ''}`} onClick={() => this.setState({ attendance: false, participation: false, efficacy: true })}>Bills Sponsored</p>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Attendance' ? 'active' : ''}`} onClick={() => this.setState({ attendance: true, participation: false, efficacy: false })}>Work Attendance</p>
              <p className={`rank-category-item ${this.getActiveCategory() === 'Votes' ? 'active' : ''}`} onClick={() => this.setState({ attendance: false, participation: true, efficacy: false })}>Votes Cast</p>
            </div>
          </div>
          <div className="rank-toggle-wrap">
            <div className={`rank-toggle-chamber ${this.getActiveChamber() === 'house' ? 'active' : ''}`} onClick={() => this.selectChamber('house')}>House</div>
            <div className={`rank-toggle-chamber ${this.getActiveChamber() === 'senate' ? 'active' : ''}`} onClick={() => this.selectChamber('senate')}>Senate</div>
          </div>
        </div>
        <div className="rank-sort-wrap">
          <div className="rank-search">
            <input className="rank-search-filter no-focus-style" placeholder="Search" ref={c => this.searchBox = c} onChange={this.handleSearch} />
            <div className="search-bar-icon">
              <IconSearch width="20px" fill="#3A7ADB" />
            </div>
          </div>
          <button className={`rank-sort-btn button--outline button--blue button--medium ${bestToWorst ? 'sort-down' : 'sort-up'}`} onClick={() => this.setState({bestToWorst: !bestToWorst})}>
            <span className="button-contents">
              Sort
              <IconTriangleDown fill="#3A7ADB" />
            </span>
          </button>
          <span className="control-button question-mark-circle" onClick={() => this.getExplainerModal()}>?</span>
        </div>
        <div className="rank-list-wrap">
          <div className="rank-modal-overlay" ref="explainerModal" onClick={(e) => this.getExplainerModal(e)}>
            <div className="rank-explainer-modal">
              <div className="card-close" onClick={(e) => this.getExplainerModal(e)}>
                <IconClose color="white"/>
              </div>
              {this.getExplainerCopy()}
            </div>
          </div>
          {this.getRankList()}
        </div>
      </div>
    )
  }
}


export default Relay.createContainer(Rank, {
  initialVariables: {
    chamber: null,
    category: null,
    search_term: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      ${RepRankClusterGroup.getFragment('data')}
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
        letter_grade
        address
        bio_text
        chamber
        congress_url
        facebook
        leadership_position
        letter_grade
        number_grade
        phone
        served_until
        twitter_handle
        twitter_url
        website
        year_elected
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
        letter_grade
        address
        bio_text
        chamber
        congress_url
        facebook
        leadership_position
        letter_grade
        number_grade
        phone
        served_until
        twitter_handle
        twitter_url
        website
        year_elected
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
        letter_grade
        address
        bio_text
        chamber
        congress_url
        facebook
        leadership_position
        letter_grade
        number_grade
        phone
        served_until
        twitter_handle
        twitter_url
        website
        year_elected
      }
      search(search_term: $search_term, category: $category, chamber: $chamber) {
        address
        bio_text
        bioguide_id
        chamber
        congress_url
        district
        facebook
        leadership_position
        letter_grade
        name
        number_grade
        party
        phone
        photo_url
        rank
        served_until
        state
        twitter_handle
        twitter_url
        website
        year_elected
      }
    }
  `
  }
});
