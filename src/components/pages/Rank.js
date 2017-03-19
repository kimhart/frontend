import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import RepRankCluster from '../rank/RepRankCluster';

class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attendance: 'hidden',
      participation: 'hidden',
      efficacy: 'active'
    };
    props.relay.setVariables({ chamber: 'house' });
  }

  getRankList = () => {
    let { attendance, participation, efficacy } = this.state;
    let { rank_attendance, rank_participation, rank_efficacy } = this.props.data;
    if (attendance === 'active') return rank_attendance ? rank_attendance.map(rep => <RepRankCluster category="attendance" {...this.props} key={rep.bioguide_id} {...rep} />) : null;
    if (participation === 'active') return rank_participation ? rank_participation.map(rep => <RepRankCluster category="participation" {...this.props} key={rep.bioguide_id} {...rep} />) : null;
    if (efficacy === 'active') return rank_efficacy ? rank_efficacy.map(rep => <RepRankCluster category="efficacy" {...this.props} key={rep.bioguide_id} {...rep} />) : null;
    return false;
  }

  getActiveCategory = () => {
    let { attendance, participation, efficacy } = this.state;
    if (attendance === 'active') return 'attendance';
    if (participation === 'active') return 'votes';
    if (efficacy === 'active') return 'bills';
    return false;
  }

  getActiveChamber = () => {
    let { chamber } = this.props.relay.variables;
    if (chamber === 'house') return 'house';
    if (chamber === 'senate') return 'senate';
    return false;
  }

  getExplainerCopy = () => {
    let { attendance, participation, efficacy } = this.state;
    if (attendance === 'active') return "Days at work compared to the total work days this term.";
    if (participation === 'active') return "Votes cast compared to the total votes held this term.";
    if (efficacy === 'active') return "Bills created compared to the most bills created by a single rep this term.";
    return false;
  }

  render() {
    console.log(this.props.data)
    return (
      <div className="rank-wrap">
        <div className="rank-controls-wrap">
          <div className="rank-category-wrap">
            <p className={`rank-category-item ${this.getActiveCategory() === 'bills' ? ' active' : ''}`} onClick={() => this.setState({ attendance: 'hidden', participation: 'hidden', efficacy: 'active' })}>Bills</p>
            <p className={`rank-category-item ${this.getActiveCategory() === 'attendance' ? ' active' : ''}`} onClick={() => this.setState({ attendance: 'active', participation: 'hidden', efficacy: 'hidden' })}>Attendance</p>
            <p className={`rank-category-item ${this.getActiveCategory() === 'votes' ? ' active' : ''}`} onClick={() => this.setState({ attendance: 'hidden', participation: 'active', efficacy: 'hidden' })}>Votes</p>
          </div>
          <div className="rank-category-explainer-wrap">
            <p className="rank-category-explainer-copy">{this.getExplainerCopy()}</p>
          </div>
          <div className="rank-toggle-wrap">
            <p className={`rank-toggle-chamber ${this.getActiveChamber() === 'house' ? ' active' : ''}`} onClick={() => this.props.relay.setVariables({ chamber: 'house' })}>House</p>
            <p className={`rank-toggle-chamber ${this.getActiveChamber() === 'senate' ? ' active' : ''}`} onClick={() => this.props.relay.setVariables({ chamber: 'senate' })}>Senate</p>
          </div>
        </div>
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

