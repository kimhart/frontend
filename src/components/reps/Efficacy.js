import React from 'react';
import Relay from 'react-relay';
import BasicDonutChart from '../charts/BasicDonutChart';

class Efficacy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, congress: "current" });
  }

  render() {
    const { efficacy } = this.props.data;
    const repSponsors = efficacy ? efficacy.rep_sponsor : null;
    const maxSponsors = efficacy ? efficacy.max_sponsor : null;

    return (
      <div className="slider-container">
        <BasicDonutChart value={repSponsors || 0} max={maxSponsors || 100} height={150} width={150} label="Bills" />
      </div>
    );
  }
}

export default Relay.createContainer(Efficacy, {
  initialVariables: {
    bioguide_id: null,
    congress: null
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      efficacy(bioguide_id: $bioguide_id, congress: $congress) {
        bioguide_id
        max_sponsor
        rep_sponsor
        sponsor_percent
      }
    }
  `
  }
});
