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
    return policyAreas ? policyAreas.map((policyArea, index) => {
      let { policy_area, percent, count } = policyArea;
      let divs = [];
      for (let i = 0; i < count; i++) {
        divs.push('hello moto');
      }
      return (
        <div key={`${policy_area}${index}`} className="policy-area">
          <div className="policy-area-title">
            {policy_area}
          </div>
          <div className="policy-area-divs">
            { divs.map((_, i) => (
              <div key={`${i}${policy_area}${index}`} className="policy-area-div" />
            ))}
          </div>
        </div>
      )
    })
    : null;
  }

  render() {

    return (
      <div className="donut-chart-container comparison">
        <div className="policy-areas">
          {this.getPolicyAreas()}
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
        count
        percent
        policy_area
      }
    }
  `
  }
});
