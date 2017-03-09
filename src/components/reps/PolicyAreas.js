import React from 'react';
import Relay from 'react-relay';

class PolicyAreas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id });
  }

  getPolicyAreas= () => {
    const policyAreas = this.props.data.policy_areas;    
    return policyAreas ? policyAreas.map((policyArea, index) => <li key={index}>{policyArea.policy_area}: {Math.round(policyArea.percent * 100)}%</li>) : null;
  }

  render() {

    return (
      <div className="slider-container comparison">
        <div className="slider-labels">
          <h4>Policies of interest:</h4>
          <ul className="policy-areas">
            {this.getPolicyAreas()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(PolicyAreas, {
  initialVariables: {
    bioguide_id: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      policy_areas(bioguide_id: $bioguide_id) {
        percent
        policy_area
      }
    }
  `
  }
});
