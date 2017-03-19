import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class Ranks extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ chamber: 'house' });
  }

  getPhotoSource = () => {
    let { photo_url } = this.props.location.query;
    if (!!photo_url && photo_url.toLowerCase() !== 'none') {
      return `https://www.${photo_url}`;
    } return '/img/bio_images/placeholder.png';
  }

  // toggleChamber = () => {
  //   if (this.props.relay.variables.chamber === 'house') {
  //     this.props.relay.setVariables({
  //       chamber: 'senate'
  //     });
  //   } else {
  //     this.props.relay.setVariables({
  //       chamber: 'house'
  //     });
  //   }
  // }

  render() {
    console.log(this.props.data)
    return (
      <div className="ranks-wrap">
        <h2>Hello</h2>
        <p onClick={() => this.props.relay.setVariables({ chamber: 'senate' })}>Senate</p>
        <p onClick={() => this.props.relay.setVariables({ chamber: 'house' })}>Senate</p>
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

