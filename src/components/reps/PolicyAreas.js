import React from 'react';
import Relay from 'react-relay';

class PolicyAreas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id });
  }

  getPolicyAreas = () => {
    const policyAreas = this.props.data.policy_areas;
    return policyAreas ? policyAreas.map((policyArea, index) => <li key={index}>{policyArea}</li>) : null;
  }

  render() {
    

    return (
      <div className="slider-container comparison">
        <div className="slider-labels">
          <ul>
            {this.getPolicyAreas()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(PolicyAreas, {
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
