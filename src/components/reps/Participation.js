import React from 'react';
import Relay from 'react-relay';

class Participation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    props.relay.setVariables({ bioguide_id: props.bioguide_id, congress: "current", chamber: props.chamber });
  }

  render() {
    let { participation } = this.props.data;
    return (
      <p className="rep-votes">Participation (total votes): {participation ? participation.rep_votes : null} </p>
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
