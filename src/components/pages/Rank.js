import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import RepRankCluster from '../rank/RepRankCluster';

class Ranks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attendance: 'active',
      participation: 'hidden',
      efficacy: 'hidden'
    };
    props.relay.setVariables({ chamber: 'house' });
  }

  getRank = () => {
    let { rank_participation, rank_efficacy, rank_attendance } = this.props.data;
    if (this.state.attendance === 'active') {
      return rank_participation ? rank_participation.map(rep => <RepRankCluster {...this.props} key={rep.bioguide_id} {...rep} />) : null;
    }
  }

  render() {
    console.log(this.props.data)
    return (
      <div className="rank-wrap">
        <div className="rank-toggle-wrap">
          <p onClick={() => this.props.relay.setVariables({ chamber: 'senate' })}>Senate</p>
          <p onClick={() => this.props.relay.setVariables({ chamber: 'house' })}>House</p>
        </div>
        {this.getRank()}
      </div>
    );
  }
}


export default Relay.createContainer(Ranks, {
  initialVariables: {
    chamber: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
      rank_attendance(chamber: $chamber) {
        bioguide_id
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

