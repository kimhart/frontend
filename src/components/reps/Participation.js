import React from 'react';
import Relay from 'react-relay';
import BasicDonutChart from '../charts/BasicDonutChart';

class Participation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, congress: "current", chamber: props.chamber });
  }

  render() {
    const { participation } = this.props.data;
    const repVotes = participation ? participation.rep_votes : null;
    const totalVotes = participation ? participation.total_votes : null;

    return (
      <div className="donut-chart-container">
        <BasicDonutChart value={repVotes || 0} max={totalVotes || 100} height={150} width={150} label="Votes" />
      </div>
    );
  }
}

export default Relay.createContainer(Participation, {
  initialVariables: {
    bioguide_id: null,
    congress: null,
    chamber: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      participation(bioguide_id: $bioguide_id, congress: $congress, chamber: $chamber) {
        bioguide_id
        percent_votes
        rep_votes
        total_votes
      }
    }
  `
  }
});
