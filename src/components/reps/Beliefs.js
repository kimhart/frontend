import React from 'react';
import Relay from 'react-relay';
import { isLoading } from '../../utils/Utils';
import BeliefRange from './BeliefRange';

class Beliefs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      level: 'overall'
    };
    props.relay.setVariables({ bioguide_id: props.bioguide_id }, ({ done, aborted, error }) => {
      if (done || aborted || error) {
        isLoading(false);
      }
    });
    isLoading(true);
  }

  renderBeliefs({ beliefs, level }) {
    return [beliefs.filter(belief => belief.type === level).map(belief => {
      let { type, bioguide_id, sub_type_of, tally_score } = belief;
      return (
        <div key={`${bioguide_id}${sub_type_of}${type}`} className="rep-belief-item clickable" onClick={() => this.setState({ level: type === 'overall' ? 'overall' : sub_type_of })}>
           <div className="rep-belief-item-type">{type}</div>
           <BeliefRange {...this.props} {...belief} />
        </div>
      )
    }), beliefs.filter(belief => belief.sub_type_of === level).map(belief => {
      let { type, bioguide_id, sub_type_of, tally_score } = belief;
      return (
        <div key={`${bioguide_id}${sub_type_of}${type}`} className="rep-belief-item clickable" onClick={() => this.setState({ level: type || level })}>
           <div className="rep-belief-item-type">{type}</div>
           <BeliefRange {...this.props} {...belief} />
        </div>
      )
    })];
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data.beliefs) {
      let { beliefs } = nextProps.data;
      Object.assign(nextState, {
        beliefs: beliefs.map(belief => ({
          ...belief,
          children: beliefs.filter(b => b.sub_type_of === belief.type)
        }))
      });
    }
  }

  render() {
    let { beliefs, level } = this.state;
    if (!beliefs) return null;
    return (
      <div>{ this.renderBeliefs({ beliefs, level }) }</div>
    );
  }

}

export default Relay.createContainer(Beliefs, {
  initialVariables: {
    bioguide_id: null,
  },
  fragments: {
    data: () => Relay.QL`
    fragment on Data {
      id
      beliefs(bioguide_id: $bioguide_id) {
        bioguide_id
        sub_type_of
        tally_score
        total_actions
        type
      }
    }
  `
  }
});
