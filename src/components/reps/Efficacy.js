import React from 'react';
import Relay from 'react-relay';

class Efficacy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, congress: "current" });
  }

  render() {
    let { efficacy } = this.props.data;
    return (
      <p className="rep-sponsors">Efficacy (total sponsored): {efficacy ? efficacy.rep_sponsor : null} </p>
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
