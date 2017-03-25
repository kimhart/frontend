import React from 'react';
import Relay from 'react-relay';
import BasicDonutChart from '../charts/BasicDonutChart';

class MembershipStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, chamber: props.chamber });
  }

  getStyles = () => {
    let membershipStats = this.props.data.membership_stats;
    const membershipPercent = membershipStats ? (membershipStats.percent * 100) : null;
    let color;
    let darkerColor;

    if ( membershipPercent < 50) {
      color = ' #D95852';
      darkerColor = '#D05350';
    } else if ( membershipPercent > 50 &&  membershipPercent < 75) {
      color = '#f4c542';
      darkerColor = '#D9AF3B';
    } else if ( membershipPercent > 75) {
      color = '#93db76';
      darkerColor = '#89CB71';
    };
    let sliderStyle = {
      background: `linear-gradient(${darkerColor}, ${color}, ${darkerColor})`,
      width: `${membershipPercent}%`
    };
    return sliderStyle;
  }

  render() {
    const membershipStats = this.props.data.membership_stats;
    const numCommittees = membershipStats ? membershipStats.num_committees : null;
    const maxCommittees = membershipStats ? membershipStats.max_committees : null;

    return (
      <div className="slider-container comparison">
        <BasicDonutChart value={numCommittees || 0} max={maxCommittees || 100} height={150} width={150} label="Committees" />
      </div>
    );
  }
}

export default Relay.createContainer(MembershipStats, {
  initialVariables: {
    bioguide_id: null,
    chamber: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      membership_stats(bioguide_id: $bioguide_id, chamber: $chamber) {
        bioguide_id
        num_committees
        max_committees
        percent
      }
    }
  `
  }
});
